from datetime import datetime, timedelta, timezone
import hashlib
import secrets

import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.constants import SIXTY_FOUR
from app.core.environment_variables import (
    ACCESS_TOKEN_EXPIRE,
    JWT_ALGORITHM,
    JWT_SECRET,
    REFRESH_TOKEN_EXPIRE,
)
from app.models.refresh_token import RefreshToken


async def create_access_token(
    data: dict,
    expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE)
) -> str:
    to_encode = data.copy()
    expire = datetime.now(tz=timezone.utc) + expires_delta
    to_encode.update({'exp': expire, 'type': 'access'})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def create_and_store_refresh_token(
    user_id: int,
    session: AsyncSession
) -> str:
    token = secrets.token_urlsafe(SIXTY_FOUR)
    hashed_token = hash_token(token)
    expires_at = datetime.now(tz=timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE)

    refresh_token = RefreshToken(
        token=hashed_token,
        user_id=user_id,
        expires_at=expires_at
    )
    session.add(refresh_token)
    await session.commit()
    return token


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()
