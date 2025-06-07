from sqlalchemy import BigInteger
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    tg_id = mapped_column(BigInteger)
    first_name: Mapped[str]
    last_name: Mapped[str]
    username: Mapped[str]
    photo_url: Mapped[str | None] = mapped_column(nullable=True)
    auth_date: Mapped[int]
