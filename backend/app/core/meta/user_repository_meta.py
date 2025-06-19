from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User

class UserRepositoryMeta(ABC):

    _session: AsyncSession  

    def __init__(self, session: AsyncSession):
        self._session = session
    
    @abstractmethod
    async def findUserAsync(self, user_id: int) -> User | None:
        pass

    @abstractmethod
    async def saveAsync(self):
        pass