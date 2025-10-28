from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from core.services.email_service import EmailService
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, SocketToken

from apps.auth.serializer import EmailSerializer, PasswordSerializer, UserRoleSerializer
from apps.users.serializer import UserSerializer

UserModel = get_user_model()

class ActivateUserAccountView(GenericAPIView):
    permission_classes = (AllowAny,)

    def patch(self, *args, **kwargs):
        token = kwargs['token']
        user = JWTService.verify_token(token, ActivateToken)
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RecoveryRequestView(GenericAPIView):
    permission_classes = (AllowAny,)
    
    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, email=serializer.data['email'])
        EmailService.recovery(user)
        return Response({'details': 'Link send to email'}, status=status.HTTP_200_OK)


class RecoveryPasswordView(GenericAPIView):
    permission_classes = (AllowAny,)

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
    permission_classes = (IsAuthenticated, )

    def get(self, *args, **kwargs):
        token = JWTService.create_token(user=self.request.user, token_class=SocketToken)
        return Response({'token': str(token)}, status=status.HTTP_200_OK)


class UserRoleView(GenericAPIView):
    permission_classes = (IsAuthenticated, )

    
    def get(self, request):
        user = request.user
        role_obj = getattr(user, 'role', None)
        role = role_obj.role if role_obj else None
        specialty = role_obj.specialty if role_obj and role_obj.role == 'doctor' else None

        data = {
            'id': user.id,
            'is_superuser': user.is_superuser,
            'is_staff': user.is_staff,
            'is_user': user.is_active,
            'role': role,
            'specialty': specialty,
        }

        serializer = UserRoleSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

        