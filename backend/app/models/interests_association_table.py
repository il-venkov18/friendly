from sqlalchemy import Column, ForeignKey, Table

from app.core.db import Base

interests_association_table = Table(
    'user_interest_association',
    Base.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('interest_id', ForeignKey('interests.id'), primary_key=True),
)
