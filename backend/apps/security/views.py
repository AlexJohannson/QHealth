from rest_framework.generics import DestroyAPIView, ListAPIView

from apps.security.filter import SecurityFilter
from apps.security.models import LoginAttempt
from apps.security.permissions import IsSuperUserOrAdminOnly
from apps.security.serializer import SecuritySerializer


class SecurityListApiView(ListAPIView):
    queryset = LoginAttempt.objects.all()
    serializer_class = SecuritySerializer
    permission_classes = [IsSuperUserOrAdminOnly]
    filterset_class = SecurityFilter
    http_method_names = ['get']


class SecurityDestroyApiView(DestroyAPIView):
    queryset = LoginAttempt.objects.all()
    serializer_class = SecuritySerializer
    permission_classes = [IsSuperUserOrAdminOnly]
    http_method_names = ['delete']
