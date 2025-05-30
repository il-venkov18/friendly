import hashlib
import hmac
import time
import urllib.parse

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"  # Установи в .env или переменных окружения

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TelegramAuthPayload(BaseModel):
    initData: str  # передаём initData как одну строку


def parse_init_data(init_data: str) -> dict:
    parsed = urllib.parse.parse_qs(init_data, strict_parsing=True)
    return {k: v[0] for k, v in parsed.items()}


def verify_telegram_auth(init_data: str, bot_token: str) -> dict:
    data = parse_init_data(init_data)

    if 'hash' not in data:
        raise ValueError("Missing 'hash' field")

    received_hash = data.pop("hash")

    data_check_string = '\n'.join(
        f"{k}={data[k]}" for k in sorted(data.keys())
    )

    secret_key = hmac.new(
        key=bot_token.encode(),
        msg=b"WebAppData",
        digestmod=hashlib.sha256
    ).digest()

    calculated_hash = hmac.new(
        key=secret_key,
        msg=data_check_string.encode(),
        digestmod=hashlib.sha256
    ).hexdigest()

    if calculated_hash != received_hash:
        raise ValueError("Invalid hash")

    # проверка на устаревание
    auth_date = int(data.get("auth_date", "0"))
    if time.time() - auth_date > 86400:  # 24 часа
        raise ValueError("Auth date is too old")

    return data  # validated


@app.post("/auth/telegram")
def telegram_auth(payload: TelegramAuthPayload):
    try:
        validated_data = verify_telegram_auth(payload.initData, BOT_TOKEN)
        return {
            "status": "ok",
            "data": validated_data
        }
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))