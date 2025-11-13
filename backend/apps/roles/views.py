from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.response import Response

from core.tasks.send_block_doctor_email_task import send_block_doctor_email_task
from core.tasks.send_unblock_doctor_email_task import send_unblock_doctor_email_task

from apps.roles.filter import RolesFilter
from apps.roles.models import RolesModels
from apps.roles.permissions import IsSuperUserOrAdmin, IsSuperUserOrOperator, IsSuperUserOrRoleOwner
from apps.roles.serializer import RolesReadSerializer, RolesWriteSerializer


class RolesListCreateAPIView(ListCreateAPIView):
    queryset = RolesModels.objects.all()
    permission_classes = [IsSuperUserOrOperator]
    filterset_class = RolesFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RolesWriteSerializer
        return RolesReadSerializer


class RolesRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = RolesModels.objects.all()
    serializer_class = RolesReadSerializer
    permission_classes = [IsSuperUserOrRoleOwner]
    http_method_names = ['get']

class ToggleDoctorNotAvailabilityAPIView(UpdateAPIView):
    queryset = RolesModels.objects.filter(role='doctor')
    serializer_class = RolesReadSerializer
    permission_classes = [IsSuperUserOrAdmin]
    http_method_names = ['patch']

    def patch(self, request, *args, **kwargs):
        role = self.get_object()
        role.is_available_for_booking = not role.is_available_for_booking
        role.save()
        send_block_doctor_email_task.delay(role.user.id)
        return Response({'is_available_for_booking': role.is_available_for_booking}, status=status.HTTP_200_OK)

class ToggleDoctorAvailabilityAPIView(UpdateAPIView):
    queryset = RolesModels.objects.filter(role='doctor')
    serializer_class = RolesReadSerializer
    permission_classes = [IsSuperUserOrAdmin]
    http_method_names = ['patch']

    def patch(self, request, *args, **kwargs):
        role = self.get_object()
        role.is_available_for_booking = True
        role.save()
        send_unblock_doctor_email_task.delay(role.user.id)
        return Response({'is_available_for_booking': role.is_available_for_booking}, status.HTTP_200_OK)






