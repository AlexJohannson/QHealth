from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.users.models import UserModel
from apps.users.serializer import UserSerializer


class UsersListCreateApiView(ListCreateAPIView):
    serializer_class = UserSerializer

class UsersRetrieveUpdateDestroyApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()
    http_method_names = ['get', 'put', 'delete']
