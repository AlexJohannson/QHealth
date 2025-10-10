import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger("security")

def error_handler(exc: Exception, context: dict):
    print(f"@@@@@@@@[DEBUG] Exception class: {exc.__class__.__name__}@@@@@@@@")
    handlers = {
        "JWTException": _jwt_exception_handler,
        "PermissionDenied": _permission_denied_handler,
        "InvalidToken": _invalid_token_handler,
        "AuthenticationFailed": _authentication_failed_handler,
        "Http404": _close_permission,
        "ProtectedError": _protected_error,
        "ValidationError": _user_delete_blocked_handler,

    }

    response = exception_handler(exc, context)
    exc_class = exc.__class__.__name__

    if exc_class in handlers:
        return handlers[exc_class](exc, context)

    return response

def _jwt_exception_handler(exc, context):
    return Response({'detail': 'JWT expired or invalid.'}, status.HTTP_401_UNAUTHORIZED)

def _permission_denied_handler(exc, context):
    return Response({'detail': 'You dont have access!'}, status.HTTP_403_FORBIDDEN)

def _invalid_token_handler(exc, context):
    return Response({'detail': 'You are not authenticated!'}, status.HTTP_401_UNAUTHORIZED)

def _authentication_failed_handler(exc, context):
    return Response({'detail': 'Invalid login data.'}, status.HTTP_401_UNAUTHORIZED)

def _close_permission(exc, context):
    return Response({'detail': 'Invalid data.'}, status.HTTP_403_FORBIDDEN)

def _protected_error(exc, context):
    return Response({
        'detail': 'It is not possible to delete a diagnosis if you have booked diagnostic appointments.'
    }, status.HTTP_403_FORBIDDEN)

def _user_delete_blocked_handler(exc, context):
    if str(exc) == "Cannot delete user with active bookings.":
        return Response(
            {'detail': 'User cannot be deleted because they have active bookings.'},
            status.HTTP_403_FORBIDDEN
        )
    return Response({'detail': str(exc)}, status.HTTP_400_BAD_REQUEST)




