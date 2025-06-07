from typing import Optional

from pydantic import BaseModel


class UserReadSchema(BaseModel):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    username: Optional[str]
    photo_url: Optional[str]
    auth_date: Optional[int]

    class Config:
        orm_mode = True
