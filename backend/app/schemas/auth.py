from pydantic import BaseModel


class TelegramAuthPayload(BaseModel):
    initData: str
