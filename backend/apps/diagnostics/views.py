from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from apps.diagnostics.filter import DiagnosticsFilter
from apps.diagnostics.models import DiagnosticsModel
from apps.diagnostics.permissions import IsSuperUserOrAdmin
from apps.diagnostics.serializer import DiagnosticsSerializer


class DiagnosticsCreateListApiView(ListCreateAPIView):
    """
    get:
        Get diagnostics list
    post:
        Create new diagnostic
    """
    queryset = DiagnosticsModel.objects.all()
    serializer_class = DiagnosticsSerializer
    filterset_class = DiagnosticsFilter

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        else:
            return [IsSuperUserOrAdmin()]


class DiagnosticsRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    get:
        Get diagnostic details by ID
    patch:
        Patrial update diagnostic details by ID
    delete:
        Delete diagnostic detail by ID
    """
    queryset = DiagnosticsModel.objects.all()
    serializer_class = DiagnosticsSerializer
    http_method_names = ['get', 'patch', 'delete']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        else:
            return [IsSuperUserOrAdmin()]

