from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.v1 import api_router as api_v1_router
from app.core.environment_variables import ALLOWED_ORIGINS

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(api_v1_router, prefix='/api/v1')
