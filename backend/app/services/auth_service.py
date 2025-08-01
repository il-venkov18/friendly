import hashlib
import hmac
import json
import urllib.parse

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.environment_variables import BOT_TOKEN
from app.models.user import User


def parse_telegram_init_data(auth_data: str) -> dict:
    """Парсинг и валидация initData из Telegram WebApp."""
    try:
        data = dict(urllib.parse.parse_qsl(urllib.parse.unquote(auth_data)))
        if 'hash' not in data:
            raise ValueError('Missing hash in data')

        hash_received = data.pop('hash')
        data_check_string = '\n'.join(f'{k}={v}' for k, v in sorted(data.items()))

        secret_key = hmac.new('WebAppData'.encode(), BOT_TOKEN.encode(), hashlib.sha256).digest()
        hash_calculated = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        if not hmac.compare_digest(hash_received, hash_calculated):
            raise ValueError('Hash mismatch')

        return data
    except Exception as exc:
        raise ValueError(f'Invalid initData: {exc}')


async def get_or_create_user(tg_data: dict, session: AsyncSession) -> User:
    """Получение пользователя из БД или создание нового."""
    user_info = json.loads(tg_data.get('user'))
    tg_id = int(user_info['id'])
    auth_date = int(user_info.get('auth_date') or tg_data.get('auth_date'))

    try:
        result = await session.execute(select(User).where(User.tg_id == tg_id))
        user = result.scalars().first()

        if not user:
            user = User(
                tg_id=tg_id,
                first_name=user_info.get('first_name', 'Unknown'),
                username=user_info.get('username'),
                photo_url=user_info.get('photo_url'),
                auth_date=auth_date,
                sex=None,
                birth_date=None,
                city_id=None
            )
            session.add(user)
            await session.commit()
            await session.refresh(user)

        return user
    except SQLAlchemyError as e:
        raise RuntimeError(f'Database error: {e}')
