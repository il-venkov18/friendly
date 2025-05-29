import hashlib
import hmac

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"

app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Укажите разрешенные источники
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )


def check_telegram_auth(data: dict, bot_token: str) -> bool:
    print('test')
    auth_data = data.copy()
    hash_to_check = auth_data.pop("hash")
    print(hash_to_check)

    data_check_string = '\n'.join(
        f"{k}={v}" for k, v in sorted(auth_data.items())
    )

    secret_key = hashlib.sha256(bot_token.encode()).digest()
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    print(calculated_hash)

    print(hmac.compare_digest(calculated_hash, hash_to_check))
    return hmac.compare_digest(calculated_hash, hash_to_check)


class TelegramAuthData(BaseModel):
    id: int
    first_name: str
    username: str | None
    photo_url: str | None
    auth_date: int
    hash: str


@app.post("/auth/telegram")
async def auth_telegram(data: TelegramAuthData):
    print('test2')
    if not check_telegram_auth(data.dict(), BOT_TOKEN):
        raise HTTPException(status_code=403, detail="Invalid Telegram data")

    # Тут можно создать/найти пользователя в БД по `id`
    # и вернуть токен/куки сессии.

    return {"status": "ok", "user_id": data.id}


