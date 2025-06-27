from logging import Logger
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.core.impl.user_repository import UserRepository
from app.core.logger import get_logger
from app.core.meta.user_repository_meta import UserRepositoryMeta
from app.services.impl.user_service import UserService
from app.services.meta.user_service_meta import UserServiceMeta


def get_user_repository(session: Annotated[AsyncSession, Depends(get_async_session)]) -> UserRepositoryMeta:
    return UserRepository(session)


def get_user_service(    
    user_repo: Annotated[UserRepositoryMeta, Depends(get_user_repository)],
    session: Annotated[AsyncSession, Depends(get_async_session)],
    logger: Annotated[Logger, Depends(get_logger)]
) -> UserServiceMeta:
    return UserService(user_repo, session, logger)


