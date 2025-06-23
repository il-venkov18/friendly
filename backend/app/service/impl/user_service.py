from logging import Logger

from app.core.meta.user_repository_meta import UserRepositoryMeta
from app.exceptions.user_not_found_exception import UserNotFoundException
from app.models.user import User
from ..meta.user_service_meta import UserServiceMeta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from ..meta.user_service_meta import UserServiceMeta


class UserService(UserServiceMeta):

        def __init__(self, userRepository: UserRepositoryMeta,
                        session: AsyncSession,
                        logger: Logger):
                super().__init__(userRepository, session, logger)

        async def setLikeAsync(self, user_id_1: int, user_id_2: int) -> bool:
        # TODO check if user_id_1 is id of current user 
        # TODO tests

                current_user = await self._userRepository.findAsync(user_id_1, [selectinload(User.liked_users), selectinload(User.matches)])

                if current_user == None:
                        self._logger.exception("current_user with id = ${user_id_1} does not exist")
                        raise UserNotFoundException("current_user with id = %{user_id_1} does not exist")

                liked_user = await self._userRepository.findAsync(user_id_2, [selectinload(User.liked_users)])

                if liked_user == None:
                        self._logger.exception("liked_user with id = {user_id_2} does not exist")
                        raise UserNotFoundException("liked_user with id = {user_id_2} does not exist")

                self._logger.info("users are found with ids {user_id_1} and {user_id_2}")
                if len(liked_user.liked_users):
                        self._logger.info(liked_user.liked_users[0].id)
                        self._logger.info(len(liked_user.liked_users))
                else:
                        self._logger.info("gavno")

                current_user.liked_users.append(liked_user)

                self._logger.info("added ${user_id_2} to liked_users of ${user_id_1}")

                if any(u for u in liked_user.liked_users if u.id == current_user.id):
                        self._logger.info("match between %{user_id_2} and %{user_id_1}")
                        current_user.matches.append(liked_user)

                await self._userRepository.saveAsync()

                self._logger.info("database is saved")

                return True

        async def setDislikeAsync(self, user_id_1: int, user_id_2: int) -> bool:
                current_user = self._userRepository.findAsync(user_id_1, [selectinload(User.disliked_users, User.matches)])

                if current_user == None:
                        self._logger.exception("current_user with id = ${user_id_1} does not exist")
                        raise UserNotFoundException("current_user with id = %{user_id_1} does not exist")

                disliked_user = await self._userRepository.findAsync(user_id_2)

                if disliked_user == None:
                        self._logger.exception("disiked_user with id = %{user_id_2} does not exist")
                        raise UserNotFoundException("disliked_user with id = %{user_id_2} does not exist")

                self._logger.info("users are found with ids %{user_id_1} and %{user_id_2}")

                current_user.disliked_users.append(disliked_user)

                self._logger.info("added %{user_id_2} to disliked_users of %{user_id_1}")

                await self._userRepository.saveAsync()

                return True

        async def _isMatch(self, user_id_to_find: int, user_id_liked: int):
                return await self._userRepository.findAsyncWithUserInLiked(user_id_to_find, user_id_liked)
