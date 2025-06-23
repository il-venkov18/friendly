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

Пример заполнения .env файла (поместить его в директорию /infra/.env):

```
POSTGRES_DB=friendly_db
POSTGRES_USER=<юзер постгрес>
POSTGRES_PASSWORD=<пароль юзера Постгрес>
POSTGRES_HOST=db
POSTGRES_PORT=5432

JWT_SECRET=<секретный ключ>
JWT_ALGORITHM=<алгоритм шифрования> (обычно HS256)
ACCESS_TOKEN_EXPIRE=<время жизни аксесс токена в минутах>
REFRESH_TOKEN_EXPIRE=<время жизни рефреш токена в днях>

BOT_TOKEN=<токен телеграм Бота>
```

Остановить контейнеры и удалить их вместе с волюмами:

```
docker compose down -v
```
