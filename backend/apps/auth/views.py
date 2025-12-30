from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, SocketToken
from drf_yasg.utils import swagger_auto_schema

from apps.auth.serializer import EmailSerializer, PasswordSerializer, UserRoleSerializer
from apps.users.serializer import UserSerializer

UserModel = get_user_model()

@method_decorator(name='patch', decorator=swagger_auto_schema(security=[]))
class ActivateUserAccountView(GenericAPIView):
    """
    patch:
        Activate user account
    """
    permission_classes = (AllowAny,)

    def get_serializer(self):
        return None

    def patch(self, *args, **kwargs):
        token = kwargs['token']
        user = JWTService.verify_token(token, ActivateToken)
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

@method_decorator(name='post', decorator=swagger_auto_schema(security=[]))
class RecoveryRequestView(GenericAPIView):
    """
    post:
        Send recovery request
    """
    permission_classes = (AllowAny,)

    def get_serializer(self):
        return None

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, email=serializer.data['email'])
        EmailService.recovery(user)
        return Response({'details': 'Link send to email'}, status=status.HTTP_200_OK)

@method_decorator(name='post', decorator=swagger_auto_schema(security=[]))
class RecoveryPasswordView(GenericAPIView):
    """
    post:
        Recovery password with token
    """
    permission_classes = (AllowAny,)

    def get_serializer(self):
        return None

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = PasswordSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        token = kwargs['token']
        user = JWTService.verify_token(token, RecoveryToken)
        user.set_password(serializer.data['password'])
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class WebSocketTokenView(GenericAPIView):
    """
    get:
        Get socket token
    """
    permission_classes = (IsAuthenticated,)

    def get_serializer(self):
        return None

    def get(self, *args, **kwargs):
        token = JWTService.create_token(user=self.request.user, token_class=SocketToken)
        return Response({'token': str(token)}, status=status.HTTP_200_OK)


class UserRoleView(GenericAPIView):
    """
    get:
        Get user role
    """
    permission_classes = (IsAuthenticated,)

    def get_serializer(self):
        return None

    def get(self, request):
        user = request.user
        role_obj = getattr(user, 'role', None)

        role = role_obj.role if role_obj else None
        role_id = role_obj.id if role_obj else None
        specialty = role_obj.specialty if role_obj and role_obj.role == 'doctor' else None

        data = {
            'id': user.id,
            'is_superuser': user.is_superuser,
            'is_staff': user.is_staff,
            'is_user': user.is_active,
            'role': role,
            'role_id': role_id,
            'specialty': specialty,
        }

        serializer = UserRoleSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


