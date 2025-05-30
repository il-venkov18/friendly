import hashlib
import hmac
import time
import urllib.parse
from typing import AsyncGenerator

from fastapi import FastAPI, HTTPException, Security
from fastapi.security import APIKeyHeader
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


# def parse_init_data(init_data: str) -> dict:
#     parsed = urllib.parse.parse_qs(init_data, strict_parsing=True)
#     return {k: v[0] for k, v in parsed.items()}
tg_auth = APIKeyHeader(name="Tg-Authorization", description="Telegram Init Data")


async def get_userdata(auth: str = Security(tg_auth)) -> bool:
    tg = dict(urllib.parse.parse_qsl(urllib.parse.unquote(auth)))
    if not tg.get("hash"):
        raise Exception("hash not found")
    hash = tg.pop('hash')
    params = "\n".join([f"{k}={v}" for k, v in sorted(tg.items(), key=lambda x: x[0])])
    truth_hash = hmac.new(
        hmac.new("WebAppData".encode(), BOT_TOKEN.encode(), hashlib.sha256).digest(),
        params.encode(),
        hashlib.sha256
    ).hexdigest()
    if hash != truth_hash:
        raise Exception("hash not equal")
    else:
        return True


# def verify_telegram_auth(init_data: str, bot_token: str) -> dict:
#     data = parse_init_data(init_data)
#
#     if 'hash' not in data:
#         raise ValueError("Missing 'hash' field")
#
#     received_hash = data.pop("hash")
#
#     data_check_string = '\n'.join(
#         f"{k}={data[k]}" for k in sorted(data.keys())
#     )
#
#     secret_key = hmac.new(
#         key=bot_token.encode(),
#         msg=b"WebAppData",
#         digestmod=hashlib.sha256
#     ).digest()
#
#     calculated_hash = hmac.new(
#         key=secret_key,
#         msg=data_check_string.encode(),
#         digestmod=hashlib.sha256
#     ).hexdigest()
#
#     if calculated_hash != received_hash:
#         raise ValueError("Invalid hash")

    # # проверка на устаревание
    # auth_date = int(data.get("auth_date", "0"))
    # if time.time() - auth_date > 86400:  # 24 часа
    #     raise ValueError("Auth date is too old")

    # return data  # validated


@app.post("/auth/telegram")
def telegram_auth(payload: TelegramAuthPayload):
    try:
        validated_data = get_userdata(payload.initData)
        return {
            "status": "ok",
            "data": validated_data
        }
    except ValueError as e:
        raise HTTPException(status_code=403, detail=str(e))
