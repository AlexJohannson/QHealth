import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger("security")

def error_handler(exc:Exception, context:dict):
    print(f"[DEBUG] Exception class: {exc.__class__.__name__}")
    handlers = {
        "JWTException": _jwt_exception_handler,
        "PermissionDenied": _permission_denied_handler,
        "InvalidToken": _invalid_token_handler,
        "AuthenticationFailed": _authentication_failed_handler
    }

    response = exception_handler(exc, context)
    exc_class = exc.__class__.__name__

    if exc_class in handlers:
        return handlers[exc_class](exc, context)

    return response

def _jwt_exception_handler(exc, context):
    return Response ({'detail': 'JWT expired or invalid.'}, status.HTTP_401_UNAUTHORIZED)

def _permission_denied_handler(exc, context):
    return Response({'detail': 'You dont have access!'}, status.HTTP_403_FORBIDDEN)

def _invalid_token_handler(exc, context):
    return Response({'detail': 'You are not authenticated!'}, status.HTTP_401_UNAUTHORIZED)


def _authentication_failed_handler(exc, context):
    request = context.get("request")
    if request:
        email = request.data.get("email") or request.data.get("username")
        ip = get_client_ip(request)
        logger.warning(f"<<<<FAILED LOGIN ATTEMPT | EMAIL: {email} | IP: {ip}>>>>")
    return Response({'detail': 'You dont have account!'}, status.HTTP_401_UNAUTHORIZED)

def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0]
    return request.META.get("REMOTE_ADDR")