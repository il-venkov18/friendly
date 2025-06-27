from datetime import datetime

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from starlette import status

from app.api.v1.schemas.auth import TelegramAuthPayload
from app.core.db import get_async_session
from app.core.jwt import (create_access_token, create_and_store_refresh_token, hash_token)
from app.models.refresh_token import RefreshToken
from app.services.auth_service import (get_or_create_user,
                                       parse_telegram_init_data)

router = APIRouter()


@router.post(
    '/auth_telegram',
    status_code=status.HTTP_201_CREATED
)
async def auth_telegram(
    payload: TelegramAuthPayload,
    session: AsyncSession = Depends(get_async_session)
):
    """Авторизация пользователя через Telegram Mini App."""
    try:
        tg_data = parse_telegram_init_data(payload.initData)
        user = await get_or_create_user(tg_data)

        token_data = {'sub': str(user.id), 'tg_id': user.tg_id}
        access_token = await create_access_token(token_data)
        refresh_token = await create_and_store_refresh_token(user.id, session)

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'bearer'
        }
    except ValueError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Invalid Telegram data')
    except RuntimeError:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Internal server error')
    except Exception:
        print('Unexpected error')
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Internal server error')


@router.post(
    '/refresh',
    description='refresh_access_token',
    status_code=status.HTTP_201_CREATED
)
async def refresh(
        refresh_token: str = Body(..., embed=True),
        session: AsyncSession = Depends(get_async_session)
):
    """Обновление access токена при помощи refresh токена."""
    hashed_token = hash_token(refresh_token)
    result = await session.execute(
        select(RefreshToken)
        .options(joinedload(RefreshToken.user))
        .where(RefreshToken.token == hashed_token)
    )
    db_token = result.scalar_one_or_none()

    if not db_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid refresh token')

    if db_token.expires_at < datetime.utcnow():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Refresh token expired')

    user_id = db_token.user_id
    tg_id = db_token.user.tg_id

    new_access_token = await create_access_token({'sub': str(user_id), 'tg_id': str(tg_id)})

    return {
        'access_token': new_access_token,
        'token_type': 'bearer'
    }
