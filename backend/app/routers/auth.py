import hashlib
import hmac
import urllib.parse

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..core.constants import BOT_TOKEN
from ..core.db import get_session
from ..models.user import User
from ..schemas.auth import TelegramAuthPayload

router = APIRouter(prefix="/auth", tags=["Auth"])


def validate(init_data: str, bot_token: str = BOT_TOKEN, skip_check: bool = False) -> dict:
    """Осторожно! Параметр skip_check в проде НУЖНО УБРАТЬ!"""

    tg = dict(urllib.parse.parse_qsl(urllib.parse.unquote(init_data)))
    if skip_check:
        return tg
    if "hash" not in tg:
        raise Exception("Missing hash")
    hash_ = tg.pop("hash")
    params = "\n".join([f"{k}={v}" for k, v in sorted(tg.items())])
    secret_key = hmac.new(
        key="WebAppData".encode(),
        msg=bot_token.encode(),
        digestmod=hashlib.sha256
    ).digest()
    computed_hash = hmac.new(secret_key, params.encode(), hashlib.sha256).hexdigest()
    if hash_ != computed_hash:
        raise Exception("Invalid hash")
    return tg


@router.post("")
async def telegram_auth(
    payload: TelegramAuthPayload,
    session: AsyncSession = Depends(get_session),
):
    try:
        tg_data = validate(payload.initData, skip_check=True)  # skip_check УБРАТЬ!!!
        user_id = int(tg_data.get("id"))

        # Проверка, есть ли пользователь
        result = await session.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalars().first()

        if not user:
            user = User(
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
