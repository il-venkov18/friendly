import hashlib
import hmac
from fastapi import FastAPI, HTTPException

from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from typing import Optional

TELEGRAM_BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_telegram_auth(data: dict, bot_token: str) -> bool:
    received_hash = data.pop("hash")
    data_check_string = "\n".join(
        [f"{k}={data[k]}" for k in sorted(data)]
    )

    secret_key = hashlib.sha256(bot_token.encode()).digest()
    hmac_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

    return hmac_hash == received_hash


class TelegramUser(BaseModel):
    id: int
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    language_code: Optional[str] = None
    allows_write_to_pm: Optional[bool] = None
    photo_url: Optional[str] = None


class TelegramAuthPayload(BaseModel):
    query_id: str
    user: TelegramUser
    auth_date: str
    hash: str
    signature: Optional[str] = None  # Необязательный параметр


@app.post("/auth/telegram")
def telegram_login(payload: TelegramAuthPayload):
    print('payload: ', payload)
    data = {
        "id": payload.user.id,
        "first_name": payload.user.first_name,
        "last_name": payload.user.last_name,
        "username": payload.user.username,
        "photo_url": payload.user.photo_url,
        "auth_date": payload.auth_date,
        "hash": payload.hash
    }

    if not check_telegram_auth(data, TELEGRAM_BOT_TOKEN):
        raise HTTPException(status_code=403, detail="Invalid Telegram auth")

    return {
        "message": "Authorized",
        "user_id": payload.user.id,
        "username": payload.user.username
    }
