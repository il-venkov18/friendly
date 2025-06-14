from pydantic import BaseModel


class UserReadSchema(BaseModel):
    id: int
    tg_id: int
    first_name: str
    last_name: str | None
    username: str | None
    photo_url: str | None
    auth_date: int

    class Config:
        orm_mode = True

