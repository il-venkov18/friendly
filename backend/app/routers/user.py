from logging import Logger
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from app.core.dependencies import get_user_service
from app.exceptions.user_not_found_exception import UserNotFoundException

from ..service.meta.user_service_meta import UserServiceMeta
from ..models.user import User
from ..core.db import get_session
from ..core.logger import get_logger
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/")
async def get(session: AsyncSession = Depends(get_session)):
        result = await session.execute(select(User))
        users = result.scalars().all()
        return users

@router.patch("/{user_id_1}/set_like/{user_id_2}")
async def add_liked_user(user_id_1: int, user_id_2: int,
                        service: Annotated[UserServiceMeta, Depends(get_user_service)],
                        logger: Annotated[Logger, Depends(get_logger)]):
        try:
                await service.setLikeAsync(user_id_1, user_id_2)
        except UserNotFoundException as e:
                logger.exception("User not found")
                raise HTTPException(status_code=404, detail=str(e)) 
        except Exception as e:
                logger.exception("Server error")
                raise HTTPException(status_code=500, detail=str(e))

        return {"status": "success"}