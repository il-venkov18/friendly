from app.core.meta.user_repository_meta import UserRepositoryMeta
from app.models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload, with_loader_criteria


class UserRepository(UserRepositoryMeta):

    def __init__(self, session: AsyncSession):
        super().__init__(session)
    
    async def findAsync(self, user_id: int, options: list = []) -> User | None:
        stmt = select(User).options(*options).where(User.id == user_id)
        result = await self._session.execute(stmt)

        return result.scalar_one_or_none()
    
    async def saveAsync(self):

        return await self._session.commit()