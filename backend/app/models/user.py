from typing import List

from app.core.db import Base
from app.models.dislikes_association_table import dislikes_association_table
from app.models.likes_association_table import likes_association_table
from app.models.matches_association_table import matches_association_table
from sqlalchemy import BigInteger, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship


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
        primaryjoin=id == likes_association_table.c.user_id_to,
        secondaryjoin=id == likes_association_table.c.user_id_from,
    )
    disliked_users: Mapped[List["User"]] = relationship(
        secondary=dislikes_association_table,
        primaryjoin=id == dislikes_association_table.c.user_id_to,
        secondaryjoin=id == dislikes_association_table.c.user_id_from,
    )
    matches: Mapped[List["User"]] = relationship(
        secondary=matches_association_table,
        primaryjoin=id == matches_association_table.c.user_id_to,
        secondaryjoin=id == matches_association_table.c.user_id_from,
        back_populates="matches"
    )
