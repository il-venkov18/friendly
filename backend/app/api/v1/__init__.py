from fastapi import APIRouter
from app.api.v1.routers import auth, home, user

api_router = APIRouter()
api_router.include_router(auth.router, prefix='/auth', tags=['auth'])
api_router.include_router(home.router, prefix='/home', tags=['home'])
api_router.include_router(user.router, prefix='/users', tags=['users'])
