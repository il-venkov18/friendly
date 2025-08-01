import os
from pathlib import Path

from dotenv import load_dotenv
from httpx import ASGITransport, AsyncClient
import pytest_asyncio

BASE_DIR = Path(__file__).resolve().parent.parent
dotenv_path = os.path.join(BASE_DIR, '../infra/.env')
load_dotenv(dotenv_path)


@pytest_asyncio.fixture
async def async_client():
    from app.main import app
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://testserver") as asynchronous_client:
        yield asynchronous_client
