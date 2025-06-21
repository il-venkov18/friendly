from __future__ import annotations

from sqlalchemy import Column
from sqlalchemy import Table
from sqlalchemy import ForeignKey

from app.core.db import Base

matches_association_table = Table(
    "matches",
    Base.metadata,
    Column("user_id_from", ForeignKey("users.id"), primary_key=True),
    Column("user_id_to", ForeignKey("users.id"), primary_key=True),
)