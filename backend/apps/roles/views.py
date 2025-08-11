from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.roles.models import RolesModels
from apps.roles.permissions import IsSuperUserOrAdmin, IsSuperUserOrRoleOwner
from apps.roles.serializer import RolesReadSerializer, RolesWriteSerializer


class RolesListCreateAPIView(ListCreateAPIView):
    queryset = RolesModels.objects.all()
    permission_classes = [IsSuperUserOrAdmin]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RolesWriteSerializer
        return RolesReadSerializer


class RolesRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = RolesModels.objects.all()
    serializer_class = RolesReadSerializer
    permission_classes = [IsSuperUserOrRoleOwner]
    http_method_names = ['get', 'delete']





