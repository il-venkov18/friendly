from abc import ABC, abstractmethod
from app.core.meta.user_repository_meta import UserRepositoryMeta
from sqlalchemy.ext.asyncio import AsyncSession
from logging import Logger

class UserServiceMeta(ABC):
    _userRepository: UserRepositoryMeta
    _session: AsyncSession
    _logger: Logger

    def __init__(self, userRepository: UserRepositoryMeta,
                            session: AsyncSession,
                            logger: Logger):
        self._logger = logger
        self._session = session
        self._userRepository = userRepository

    
    @abstractmethod
    async def setLikeAsync(self, user_id_1: int, user_id_2: int) -> bool:
        pass

    @abstractmethod
    async def setDislikeAsync(self, user_id_1: int, user_id_2: int) -> bool:
        pass