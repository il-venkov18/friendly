Собрать и запустить контейнеры:
```
docker compose up -d --build
```

Остановить контейнеры и удалить их вместе с волюмами:

```
docker compose down -v
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