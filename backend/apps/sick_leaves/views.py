from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from core.services.cloudinary_service import delete_file

from apps.sick_leaves.filter import SickLeaveFilter
from apps.sick_leaves.models import SickLeavesModel
from apps.sick_leaves.permissions import SickLeavePermission
from apps.sick_leaves.serializer import SickLeavesSerializer


class SickLeavesCreateApiView(ListCreateAPIView):
    """
        get:
            Get sick leaves list
        post:
            Create new sick leave
    """
    queryset = SickLeavesModel.objects.all()
    serializer_class = SickLeavesSerializer
    permission_classes = [SickLeavePermission]
    filterset_class = SickLeaveFilter

    def get_queryset(self):
        user = self.request.user

        if not (user.is_staff or user.is_superuser or hasattr(user, "role")):
            return SickLeavesModel.objects.filter(user=user)

        return SickLeavesModel.objects.all()


class SickLeavesRetrieveDestroyApiView(RetrieveUpdateDestroyAPIView):
    """
        get:
            Get sick leave detail by ID
        delete:
            Delete sick leave by ID
    """
    queryset = SickLeavesModel.objects.all()
    serializer_class = SickLeavesSerializer
    permission_classes = [SickLeavePermission]
    http_method_names = ['get', 'delete']

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        delete_file(instance.file_id)
        return super().destroy(request, *args, **kwargs)




