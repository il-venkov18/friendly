from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.future import select
from starlette import status

from app.core.db import async_session
from app.core.jwt import decode_access_token
from app.models.user import User

security = HTTPBearer()


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    try:
        payload = decode_access_token(credentials.credentials)
        user_id = int(payload.get('sub'))

        async with async_session() as session:
            result = await session.execute(select(User).where(User.id == user_id))
            user = result.scalars().first()

            if user is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found')

            return user
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid token')
