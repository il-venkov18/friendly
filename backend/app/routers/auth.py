import hashlib
import hmac
import json
import urllib.parse

import jwt
from app.core.db import async_session
from app.core.environment_variables import BOT_TOKEN
from app.core.jwt import (create_access_token, create_refresh_token,
                          decode_token)
from app.models.user import User
from app.schemas.auth import TelegramAuthPayload
from fastapi import APIRouter, Body, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.future import select
from starlette import status

router = APIRouter(tags=['Auth'])


def parse_telegram_init_data(auth_data: str) -> dict:
    """Парсинг и валидация initData из Telegram WebApp."""
    try:
        data = dict(urllib.parse.parse_qsl(urllib.parse.unquote(auth_data)))
        if 'hash' not in data:
            raise ValueError('Missing hash in data')

        hash_received = data.pop('hash')
        data_check_string = '\n'.join(f'{k}={v}' for k, v in sorted(data.items()))

        secret_key = hmac.new('WebAppData'.encode(), BOT_TOKEN.encode(), hashlib.sha256).digest()
        hash_calculated = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        if not hmac.compare_digest(hash_received, hash_calculated):
            raise ValueError('Hash mismatch')

        return data
    except Exception as exc:
        raise ValueError(f'Invalid initData: {exc}')


async def get_or_create_user(tg_data: dict) -> User:
    """Получить пользователя из БД или создать нового."""
    user_info = json.loads(tg_data.get("user"))
    tg_id = int(user_info['id'])
    auth_date = int(user_info.get('auth_date') or tg_data.get('auth_date'))

    async with async_session() as session:
        try:
            result = await session.execute(select(User).where(User.tg_id == tg_id))
            user = result.scalars().first()

            if not user:
                user = User(
                    tg_id=tg_id,
                    first_name=user_info.get('first_name', 'NoName'),
                    last_name=user_info.get('last_name'),
                    username=user_info.get('username'),
                    photo_url=user_info.get('photo_url'),
                    auth_date=auth_date,
                )
                session.add(user)
                await session.commit()

            return user
        except SQLAlchemyError as db_err:
            raise RuntimeError(f'Database error: {db_err}')


@router.post('/auth_telegram')
async def auth_telegram(payload: TelegramAuthPayload):
    """Авторизация пользователя через Telegram Mini App."""
    try:
        tg_data = parse_telegram_init_data(payload.initData)
        user = await get_or_create_user(tg_data)

        token_data = {'sub': str(user.id), 'tg_id': user.tg_id}
        access_token = create_access_token(token_data)
        refresh_token = create_refresh_token(token_data)

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'bearer'
        }
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Invalid Telegram data')
    except RuntimeError as re:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Internal server error')


@router.post("/refresh")
async def refresh_access_token(refresh_token: str = Body(..., embed=True)):
    try:
        payload = decode_token(refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")

        user_id = int(payload.get("sub"))
        tg_id = int(payload.get("tg_id"))

        # можно проверить наличие юзера, если нужно
        new_access_token = create_access_token({"sub": str(user_id), "tg_id": tg_id})
        return {"access_token": new_access_token, "token_type": "bearer"}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
