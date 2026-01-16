import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger("security")


def error_handler(exc: Exception, context: dict):
    handlers = {
        "TokenError": _jwt_exception_handler,
        "InvalidToken": _invalid_token_handler,
        "PermissionDenied": _permission_denied_handler,
        "AuthenticationFailed": _authentication_failed_handler,
        "ValidationError": _validation_error_handler,
        "ParseError": _parse_error_handler,
        "Http404": _not_found_handler,
        "ProtectedError": _protected_error,
    }

    
    response = exception_handler(exc, context)

    exc_class = exc.__class__.__name__
    logger.warning(f"[EXCEPTION] {exc_class}: {exc}")

    if exc_class in handlers:
        return handlers[exc_class](exc, context)

    return response


def _jwt_exception_handler(exc, context):
    return Response(
        {"detail": "JWT expired or invalid."},
        status=status.HTTP_401_UNAUTHORIZED,
    )


def _invalid_token_handler(exc, context):
    return Response(
        {"detail": "You are not authenticated!"},
        status=status.HTTP_401_UNAUTHORIZED,
    )


def _authentication_failed_handler(exc, context):
    return Response(
        {"detail": "Invalid login data."},
        status=status.HTTP_401_UNAUTHORIZED,
    )


def _validation_error_handler(exc, context):
    return Response(
        {"detail": "Invalid login data."},
        status=status.HTTP_400_BAD_REQUEST,
    )


def _parse_error_handler(exc, context):
    return Response(
        {"detail": "Invalid request format."},
        status=status.HTTP_400_BAD_REQUEST,
    )




def _permission_denied_handler(exc, context):
    return Response(
        {"detail": "You dont have access!"},
        status=status.HTTP_403_FORBIDDEN,
    )


def _not_found_handler(exc, context):
    return Response(
        {"detail": "Invalid data."},
        status=status.HTTP_404_NOT_FOUND,
    )


def _protected_error(exc, context):
    return Response(
        {
            "detail": (
                "It is not possible to delete a diagnosis "
                "if you have booked diagnostic appointments."
            )
        },
        status=status.HTTP_403_FORBIDDEN,
    )







