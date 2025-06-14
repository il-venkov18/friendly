Собрать и запустить контейнеры:
```
docker compose up -d --build
```

- Чтобы таблицы в БД создавались, нужно в /migrations/env.py импортировать все новые модели!

Подготовить миграции:
```
sudo docker exec -it backend alembic revision --autogenerate
```

Применить миграции:
```
sudo docker exec -it backend alembic upgrade head
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

BOT_TOKEN=<токен телеграм Бота>
```

Остановить контейнеры и удалить их вместе с волюмами:

```
docker compose down -v
```
