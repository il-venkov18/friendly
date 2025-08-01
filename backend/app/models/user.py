from datetime import date, datetime
from enum import Enum
from typing import List

from sqlalchemy import BigInteger, Date, DateTime
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy import ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.db import Base
from app.models.dislikes_association_table import dislikes_association_table
from app.models.interests_association_table import interests_association_table
from app.models.likes_association_table import likes_association_table
from app.models.matches_association_table import matches_association_table


class SexEnum(str, Enum):
    male = 'мужской'
    female = 'женский'


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True)
    username: Mapped[str] = mapped_column(String, nullable=True)
    first_name: Mapped[str] = mapped_column(String, nullable=False)
    sex: Mapped['SexEnum'] = mapped_column(SQLAlchemyEnum(SexEnum), nullable=True)
    birth_date: Mapped[date] = mapped_column(Date, nullable=True)
    city_id: Mapped[int] = mapped_column(ForeignKey('cities.id'), nullable=True)
    # 'university': 'ИТМО, дизайн'
    # 'goals': ['дружба', 'тусовки']
    # "vibe_social_place": "диванчик с мемами",
    # "chat_style": ["текст", "оффлайн"],
    # "reaction_to_silence": "написать ещё раз",
    # "sympathy_triggers": ["юмор", "глубина"],
    # "profile_phrase": "Люблю мемы и кофе. Ищу тех, кто поймёт вайб.",
    # "vibe_generation_count": 1,
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    photo_url: Mapped[str] = mapped_column(String, nullable=True)
    auth_date: Mapped[int] = mapped_column(Integer, nullable=False)

    city: Mapped['City'] = relationship(
        back_populates='users',
    )

    interests: Mapped[List['Interest']] = relationship(
        'Interest',
        secondary=interests_association_table,
        back_populates='users'
    )

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


class City(Base):
    __tablename__ = 'cities'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    users: Mapped[List['User']] = relationship(
        back_populates='city',
    )


class Interest(Base):
    __tablename__ = 'interests'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    users: Mapped[List['User']] = relationship(
        'User',
        secondary=interests_association_table,
        back_populates='interests',
    )
