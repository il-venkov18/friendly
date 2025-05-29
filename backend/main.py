from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import parse_qsl
import hashlib
import hmac
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"

# Фейковая БД пользователей
users_db = {}


class AuthPayload(BaseModel):
    initData: str


def check_telegram_auth(init_data: str) -> dict | None:
    parsed = dict(parse_qsl(init_data, strict_parsing=True))
    hash_ = parsed.pop("hash", None)

    if not hash_:
        return None

    data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(parsed.items()))
    secret_key = hashlib.sha256(BOT_TOKEN.encode()).digest()
    hmac_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

    if hmac_hash != hash_:
        return None

    try:
        user_data = json.loads(parsed.get("user", "{}"))
        return user_data
    except:
        return None


@app.post("/auth/verify")
def verify_user(payload: AuthPayload):
    user = check_telegram_auth(payload.initData)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid auth data")

    user_id = user["id"]
    users_db[user_id] = user  # Сохраняем пользователя в фейковую БД
    return {"user": user}