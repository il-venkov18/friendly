from sqlalchemy import BigInteger, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from app.models.likes_association_table import likes_association_table

from app.core.db import Base


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=True)
    username: Mapped[str] = mapped_column(String, nullable=True)
    photo_url: Mapped[str] = mapped_column(String, nullable=True)
    auth_date: Mapped[int] = mapped_column(Integer, nullable=False)
    liked_users: Mapped[List["User"]] = relationship(
        secondary=likes_association_table,
        primaryjoin=id == likes_association_table.c.user_id_from,
        secondaryjoin=id == likes_association_table.c.user_id_to,
    )
    # dislikes: Mapped[List["User"]] = relationship(
    #     primaryjoin=id == likes_association_table.c.user_id_from,
    #     secondaryjoin=id == likes_association_table.c.user_id_to,
    # )
    # matches: Mapped[List["User"]] = relationship(
    #     primaryjoin=id == matches_association_table.c.user_id_from,
    #     secondaryjoin=id == matches_association_table.c.user_id_to,
    #     back_populates="matches"
    # )
