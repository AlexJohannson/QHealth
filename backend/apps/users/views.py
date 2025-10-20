from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.users.filter import UsersFilter
from apps.users.permissions import (
    IsSuperUserAdminOrRole,
    IsSuperUserAdminOrRoleOrOwner,
    IsSuperUserOnly,
    IsSuperUserOrAdminOnly,
    IsSuperUserOrAdminOrUser,
)
from apps.users.serializer import UserSerializer

UserModel = get_user_model()
class UsersListCreateApiView(ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    filterset_class = UsersFilter

    def get_permissions(self):
        return [IsSuperUserAdminOrRole()] if self.request.method == 'GET' else [AllowAny()]

class UsersRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
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
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class BlockUserView(GenericAPIView):
    permission_classes = [IsSuperUserOrAdminOnly]
    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if user.is_active:
            user.is_active = False
            user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)


class UnBlockUserView(GenericAPIView):
    permission_classes = [IsSuperUserOrAdminOnly]
    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)



class UserToAdminView(GenericAPIView):
    permission_classes = [IsSuperUserOnly]
    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()
        if not user.is_staff:
            user.is_staff = True
            user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)



class UserRevokeAdminView(GenericAPIView):
    permission_classes = [IsSuperUserOnly]
    def get_queryset(self):
        return UserModel.objects.exclude(id=self.request.user.id)

    def patch(self, *args, **kwargs):
        user = self.get_object()



        if user.is_staff:
            user.is_staff = False
            user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status.HTTP_200_OK)

