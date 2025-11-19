from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from core.tasks.send_block_user_account_email_task import send_block_user_account_email_task
from core.tasks.send_create_admin_email_task import send_create_admin_email_task
from core.tasks.send_delete_user_account_email_task import send_delete_user_account_email_task
from core.tasks.send_revoke_admin_email_task import send_revoke_admin_email_task
from core.tasks.send_unblock_user_account_email_task import send_unblock_user_account_email_task
from drf_yasg.utils import swagger_auto_schema

from apps.users.filter import UsersFilter
from apps.users.permissions import (
    IsSuperUserAdminOrRole,
    IsSuperUserAdminOrRoleOrOwner,
    IsSuperUserOrAdminOnly,
    IsSuperUserOrAdminOrUser,
)
from apps.users.serializer import UserSerializer

UserModel = get_user_model()

@method_decorator(name='post', decorator=swagger_auto_schema(security=[]))
class UsersListCreateApiView(ListCreateAPIView):
    """
    get:
        Get list of users
    post:
        Create new user
    """
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    filterset_class = UsersFilter

    def get_permissions(self):
        return [IsSuperUserAdminOrRole()] if self.request.method == 'GET' else [AllowAny()]


class UsersRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
    """
    get:
        Get user details by ID
    patch:
        Patrial update user details by ID
    delete:
        Delete user account by ID
    """
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    permission_classes = [IsSuperUserOrAdminOrUser]
    http_method_names = ['get', 'patch', 'delete']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserAdminOrRoleOrOwner()]
        return [IsSuperUserOrAdminOrUser()]

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        email = user.email
        name = user.profile.name

        user.delete()

        send_delete_user_account_email_task.delay(email, name)
        return Response(status=status.HTTP_204_NO_CONTENT)


class BlockUserView(GenericAPIView):
    """
    patch:
        Block user by ID
    """
    permission_classes = [IsSuperUserOrAdminOnly]

    def get_serializer(self):
        return None

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_active:
            user.is_active = False
            user.save()
        send_block_user_account_email_task.delay(user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UnBlockUserView(GenericAPIView):
    """
    patch:
        Unblock user by ID
    """
    permission_classes = [IsSuperUserOrAdminOnly]

    def get_serializer(self):
        return None

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        send_unblock_user_account_email_task.delay(user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UserToAdminView(GenericAPIView):
    """
    patch:
        User to admin by ID
    """
    permission_classes = [IsSuperUserOrAdminOnly]

    def get_serializer(self):
        return None

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_staff:
            user.is_staff = True
            user.save()
        send_create_admin_email_task.delay(user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UserRevokeAdminView(GenericAPIView):
    """
    patch:
        Revoke admin by ID
    """
    permission_classes = [IsSuperUserOrAdminOnly]


    def get_serializer(self):
        return None

    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_staff:
            user.is_staff = False
            user.save()
        send_revoke_admin_email_task.delay(user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UserPatientApiView(ListAPIView):
    """
    get:
        Get list of patients
    """
    permission_classes = [IsSuperUserAdminOrRole]
    filterset_class = UsersFilter
    serializer_class = UserSerializer

    def get_queryset(self):
        base_qs = UserModel.objects.all()
        return base_qs.filter(
            is_superuser=False,
            is_staff=False,
            role__isnull=True
        )


class PatientRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
    """
    get:
        Get patient details by ID
    """
    permission_classes = [IsSuperUserAdminOrRoleOrOwner]
    filterset_class = UsersFilter
    serializer_class = UserSerializer
    http_method_names = ['get']

    def get_queryset(self):
        base_qs = UserModel.objects.all()
        return base_qs.filter(
            is_superuser=False,
            is_staff=False,
            role__isnull=True
        )

