from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from core.services.jwt_service import JWTService, SocketToken

User = get_user_model()

@database_sync_to_async
def get_user(token: str | None):
    try:
        user = JWTService.verify_token(token, SocketToken)
        return user
    except Exception as e:
        return AnonymousUser()

class AuthSocketMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"").decode()
        token = dict(
            [item.split('=') for item in query_string.split('&') if item]
        ).get('token', None)


        scope['user'] = await get_user(token)
        return await super().__call__(scope, receive, send)

