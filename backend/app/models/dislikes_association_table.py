from __future__ import annotations

from app.core.db import Base
from sqlalchemy import Column, ForeignKey, Table

dislikes_association_table = Table(
    "dislikes",
    Base.metadata,
    Column("user_id_from", ForeignKey("users.id"), primary_key=True),
    Column("user_id_to", ForeignKey("users.id"), primary_key=True),
)
