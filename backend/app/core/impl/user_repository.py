from sqlalchemy import select
from app.core.meta.user_repository_meta import UserRepositoryMeta
from app.models.user import User
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

class UserRepository(UserRepositoryMeta):

    def __init__(self, session: AsyncSession):
        super().__init__(session)
    
    async def findUserAsync(self, user_id: int) -> User | None:
        stmt = select(User).options(
        joinedload(User.liked_users)
        ).where(User.id == user_id)
  
        result = await self._session.execute(stmt)
        result = result.unique()

        return result.scalar_one_or_none()
    
    async def saveAsync(self):

        return await self._session.commit()