from __future__ import annotations

from sqlalchemy import Column, ForeignKey, Table

from app.core.db import Base

likes_association_table = Table(
    "likes",
    Base.metadata,
    Column("user_id_from", ForeignKey("users.id"), primary_key=True),
    Column("user_id_to", ForeignKey("users.id"), primary_key=True),
)
