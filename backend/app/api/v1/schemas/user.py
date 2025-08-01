from datetime import date

from pydantic import BaseModel

from app.models.user import SexEnum


class UserReadSchema(BaseModel):
    id: int
    tg_id: int
    username: str | None
    first_name: str
    sex: SexEnum | None
    birth_date: date
    city_id: int | None
    photo_url: str | None
    auth_date: int

    class Config:
        orm_mode = True
