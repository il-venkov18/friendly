from logging import Logger
from app.core.meta.user_repository_meta import UserRepositoryMeta
from app.exceptions.user_not_found_exception import UserNotFoundException
from ..meta.user_service_meta import UserServiceMeta
from sqlalchemy.ext.asyncio import AsyncSession

class UserService(UserServiceMeta):

    def __init__(self, userRepository: UserRepositoryMeta,
                            session: AsyncSession,
                            logger: Logger):
          super().__init__(userRepository, session, logger)

    async def setLikeAsync(self, user_id_1: int, user_id_2: int) -> bool:
        # TODO check if user_id_1 is id of current user 
        # TODO tests
        
        current_user = await self._userRepository.findUserAsync(user_id_1)

        if current_user == None:
                self._logger.exception("current_user with id = ${user_id_1} does not exist")
                raise UserNotFoundException("current_user with id = %{user_id_1} does not exist")
        
        liked_user = await self._userRepository.findUserAsync(user_id_2)

        if liked_user == None:
                self._logger.exception("liked_user with id = %{user_id_2} does not exist")
                raise UserNotFoundException("liked_user with id = %{user_id_2} does not exist")
        
        self._logger.info("users are found with ids %{user_id_1} and %{user_id_2}")

        current_user.liked_users.append(liked_user)

        self._logger.info("added %{user_id_2} to liked_users of %{user_id_1}")

        await self._userRepository.saveAsync()

        return True