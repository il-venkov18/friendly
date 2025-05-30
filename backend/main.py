import asyncio
import hashlib
import hmac
import urllib.parse

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.future import select
from models import Base, TelegramUser

app = FastAPI()
DATABASE_URL = 'postgresql+asyncpg://retool:npg_fCki8oGYTxR6@ep-wispy-dew-a6w1vna0.us-west-2.retooldb.com/retool?sslmode=require'
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)


BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"  # Установи в .env или переменных окружения


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def validate(auth: str, bot_token: str = BOT_TOKEN) -> dict:
    tg = dict(urllib.parse.parse_qsl(urllib.parse.unquote(auth)))
    if not tg.get("hash"):
        raise Exception("hash not found")
    hash_ = tg.pop('hash')
    params = "\n".join([f"{k}={v}" for k, v in sorted(tg.items(), key=lambda x: x[0])])
    truth_hash = hmac.new(
        hmac.new("WebAppData".encode(), bot_token.encode(), hashlib.sha256).digest(),
        params.encode(),
        hashlib.sha256
    ).hexdigest()
    if hash_ != truth_hash:
        raise Exception("hash not equal")
    return tg  # Возвращаем разобранные данные


class TelegramAuthPayload(BaseModel):
    initData: str  # передаём initData как одну строку


@app.post("/auth/telegram")
async def telegram_auth(payload: TelegramAuthPayload):
    try:
        tg_data = validate(payload.initData)
        user_id = int(tg_data.get("id"))
        async with AsyncSessionLocal() as session:
            result = await session.execute(
                select(TelegramUser).where(TelegramUser.id == user_id)
            )
            user = result.scalars().first()
            if not user:
                user = TelegramUser(
                    id=user_id,
                    first_name=tg_data.get("first_name"),
                    last_name=tg_data.get("last_name"),
                    username=tg_data.get("username"),
                    photo_url=tg_data.get("photo_url"),
                    auth_date=int(tg_data.get("auth_date")),
                )
                session.add(user)
                await session.commit()
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=403, detail=str(e))


async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(init_models())
