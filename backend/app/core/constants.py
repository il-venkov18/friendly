import os

from dotenv import load_dotenv

dotev_path = '../../infra/'
load_dotenv(dotenv_path=dotev_path)

POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB = os.getenv('POSTGRES_DB')
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = os.getenv('POSTGRES_PORT')

BOT_TOKEN = os.getenv('BOT_TOKEN')
