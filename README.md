Пример заполнения .env файла (поместить его в директорию /infra/.env):

```
# Данные для PostgreSQL
POSTGRES_DB=friendly_db
POSTGRES_USER=<юзер постгрес>
POSTGRES_PASSWORD=<пароль юзера Постгрес>
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Данные для pgAdmin
PGADMIN_DEFAULT_EMAIL=<имейл>
PGADMIN_DEFAULT_PASSWORD=<пароль>

# Данные для JWT
JWT_SECRET=<секретный ключ>
JWT_ALGORITHM=<алгоритм шифрования> (обычно HS256)
ACCESS_TOKEN_EXPIRE=<время жизни аксесс токена в минутах>
REFRESH_TOKEN_EXPIRE=<время жизни рефреш токена в днях>

# Токен Телеграм Бота
BOT_TOKEN=<токен телеграм Бота>
```

Собрать и запустить контейнеры:
```
docker compose up -d --build
```

- Чтобы таблицы в БД создавались, нужно в /migrations/env.py импортировать все новые модели!

Подготовить миграции:
```
docker exec -it backend alembic revision --autogenerate
```

Применить миграции:
```
docker exec -it backend alembic upgrade head
```

Зайти в консоль БД:
```
docker exec -it postgres_db psql -U postgres
```

Остановить контейнеры и удалить их вместе с волюмами:

```
docker compose down -v
```

Ссылки:
- Сайт:
```
http://127.0.0.1:8000/
```
- pgAdmin:
```
http://127.0.0.1:5050/
```
- Документация Swagger:
```
http://127.0.0.1:8000/docs
```
- Документация ReDoc:
```
http://127.0.0.1:8000/redoc
```

Для быстрого композа и миграций:
```
docker compose up -d --build &&
docker exec -it backend alembic revision --autogenerate &&
docker exec -it backend alembic upgrade head
```