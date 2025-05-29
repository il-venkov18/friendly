from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from init_data_py import InitData

app = FastAPI()
BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"

app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Укажите разрешенные источники
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )


def check_telegram_auth(data: str, bot_token: str) -> bool:
    print('Данные пользователя: ', data)
    init_data = InitData.parse(data)

    is_valid = init_data.validate(
        bot_token=bot_token,
        lifetime=3600,
    )
    print(is_valid)
    return is_valid


@app.post("/auth/telegram")
async def auth_telegram(data):
    if not check_telegram_auth(data, BOT_TOKEN):
        raise HTTPException(status_code=403, detail="Invalid Telegram data")

    # Тут можно создать/найти пользователя в БД по `id`
    # и вернуть токен/куки сессии.

    return {"status": "ok", "user_id": data.id}



# from fastapi import FastAPI
# from init_data_py import InitData
#
# TELEGRAM_BOT_TOKEN = "7531358236:AAEslLEWRJKwklbcFA-hB1qc4Uw2NVAX7AQ"  # из BotFather
#
# app = FastAPI()
#
#
# @app.post("/auth/verify")
# def verify(data):
#     print('Данные пользователя: ', data)
#     init_data = InitData.parse(data)
#
#     is_valid = init_data.validate(
#         bot_token=TELEGRAM_BOT_TOKEN,
#         lifetime=3600,
#     )
#     print(is_valid)
#     return is_valid
