from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from .routers.auth import router as auth_router
from .routers.home import router as home_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth_router)
app.include_router(home_router)
