from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import hmac
import hashlib

from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TelegramAuthPayload(BaseModel):
    id: int
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    photo_url: Optional[str] = None
    auth_date: str
    hash: str


def check_telegram_auth(data: dict, bot_token: str) -> bool:
    received_hash = data.pop("hash")
    data_check_string = "\n".join(
        f"{k}={data[k]}" for k in sorted(data)
    )
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    return calculated_hash == received_hash


@app.post("/auth/telegram")
def telegram_login(payload: TelegramAuthPayload):
    data_dict = payload.dict()
    if not check_telegram_auth(data_dict.copy(), BOT_TOKEN):
        raise HTTPException(status_code=403, detail="Invalid Telegram auth")

    return {
        "id": payload.id,
        "username": payload.username,
        "first_name": payload.first_name,
        "photo_url": payload.photo_url
    }
