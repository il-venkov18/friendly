import hashlib
import hmac
import json
import urllib.parse

from fastapi import APIRouter, HTTPException
from sqlalchemy.future import select

from app.core.constants import BOT_TOKEN
from app.core.db import async_session
from app.models.user import User
from app.schemas.auth import TelegramAuthPayload

router = APIRouter(prefix='/auth', tags=['Auth'])


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


@router.post("/auth/telegram")
async def telegram_auth(payload: TelegramAuthPayload):
    try:
        tg_data = validate(payload.initData)

        user_data = json.loads(tg_data.get("user"))
        user_id = int(user_data["id"])

        # Fallback на случай, если auth_date не входит в user_data
        auth_date = int(user_data.get("auth_date") or tg_data.get("auth_date"))

        async with async_session() as session:
            result = await session.execute(
                select(User).where(User.tg_id == user_id)
            )
            user = result.scalars().first()

            if not user:
                user = User(
                    tg_id=user_id,
                    first_name=user_data.get("first_name", "NoName"),
                    last_name=user_data.get("last_name"),
                    username=user_data.get("username"),
                    photo_url=user_data.get("photo_url"),
                    auth_date=auth_date,
                )
                session.add(user)
                await session.commit()

        return {"status": "ok", "user_id": user.id}

    except Exception as e:
        raise HTTPException(status_code=403, detail=str(e))
