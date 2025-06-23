import os

from dotenv import load_dotenv

dotev_path = '../../infra/'
load_dotenv(dotenv_path=dotev_path)

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE = int(os.getenv('ACCESS_TOKEN_EXPIRE'))
REFRESH_TOKEN_EXPIRE = int(os.getenv('REFRESH_TOKEN_EXPIRE'))

BOT_TOKEN = os.getenv('BOT_TOKEN')
