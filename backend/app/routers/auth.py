import jwt
from app.core.jwt import (create_access_token, create_refresh_token,
                          decode_token)
from app.schemas.auth import TelegramAuthPayload
from app.service.auth_service import (get_or_create_user,
                                      parse_telegram_init_data)
from fastapi import APIRouter, Body, HTTPException
from starlette import status

router = APIRouter(tags=['Auth'])


@router.post(
    '/auth_telegram',
    status_code=status.HTTP_201_CREATED
)
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


@router.post(
    "/refresh",
    description='refresh_access_token',
    status_code=status.HTTP_201_CREATED
)
async def refresh(refresh_token: str = Body(..., embed=True)):
    """Обновление access токена с помощью refresh токена."""
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
