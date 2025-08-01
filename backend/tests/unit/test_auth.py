from datetime import datetime, timedelta, timezone

import pytest
from starlette import status


@pytest.mark.asyncio
async def test_refresh_success(monkeypatch, async_client):

    class DummyUser:
        tg_id = 1

    class DummyToken:
        token = 'hashedtoken'
        expires_at = datetime.now(tz=timezone.utc) + timedelta(minutes=10)
        user_id = 1
        user = DummyUser

    async def dummy_hash_token(token):
        return 'hashedtoken'

    async def dummy_session_execute(self, query):
        class DummyResult:
            def scalar_one_or_none(self):
                return DummyToken
        return DummyResult()

    async def dummy_create_access_token(data):
        return 'new-access-token'

    monkeypatch.setattr('app.api.v1.auth.hash_token', dummy_hash_token)
    monkeypatch.setattr('app.api.v1.auth.create_access_token', dummy_create_access_token)
    monkeypatch.setattr('app.api.v1.auth.get_async_session', lambda: None)
    monkeypatch.setattr('app.api.v1.auth.AsyncSession.execute', dummy_session_execute)

    response = await async_client.post('/api/v1/auth/refresh', json={'refresh_token': 'refresh'})

    assert response.status_code == status.HTTP_201_CREATED
    json_data = response.json()
    assert 'access_token' in json_data
    assert json_data['access_token_type'] == 'bearer'
