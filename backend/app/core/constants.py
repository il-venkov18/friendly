import os
from dotenv import load_dotenv

dotev_path = '../../infra/'
load_dotenv(dotenv_path=dotev_path)

DB_USER = os.getenv('POSTGRES_USER')
DB_PASS = os.getenv('POSTGRES_PASSWORD')
DB_NAME = os.getenv('POSTGRES_DB')
DB_HOST = os.getenv('POSTGRES_HOST')
DB_PORT = os.getenv('POSTGRES_PORT')

BOT_TOKEN = os.getenv('BOT_TOKEN')
