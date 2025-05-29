import hashlib
import hmac
from fastapi import FastAPI, HTTPException
from typing import Dict

from starlette.middleware.cors import CORSMiddleware

TELEGRAM_BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def check_telegram_auth(data: Dict[str, str], bot_token: str) -> bool:
    auth_data = data.copy()
    hash_to_check = auth_data.pop("hash", None)
    if not hash_to_check:
        return False

    # Сортируем данные по ключу
    data_check_string = "\n".join(
        [f"{k}={auth_data[k]}" for k in sorted(auth_data)]
    )

    secret_key = hashlib.sha256(bot_token.encode()).digest()
    hmac_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

    return hmac_hash == hash_to_check


@app.post("/auth/telegram")
def telegram_login(payload: Dict[str, str]):
    if not check_telegram_auth(payload, TELEGRAM_BOT_TOKEN):
        raise HTTPException(status_code=403, detail="Invalid Telegram auth")

    # Здесь можно выдать свой токен, создать пользователя и т.д.
    user_id = payload["id"]
    username = payload.get("username")

    return {"message": "Authorized", "user_id": user_id, "username": username}
