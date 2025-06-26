FROM python:3.13-slim
RUN pip install --no-cache-dir poetry
WORKDIR /backend
COPY pyproject.toml poetry.lock /backend/
RUN poetry config virtualenvs.create false
RUN poetry install --no-root
COPY . .