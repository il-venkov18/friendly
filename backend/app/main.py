from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from .routers.auth import router as auth_router
from .routers.home import router as home_router
from .routers.user import router as user_router

app = FastAPI(root_path='/api')

allow_origins = (
    'http://localhost:8000',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_router)
app.include_router(home_router)
app.include_router(user_router)
