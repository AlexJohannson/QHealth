from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.booking_diagnostic.filter import BookingDiagnosticFilter
from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.booking_diagnostic.permissions import (
    IsSuperUserOrAdminOrDoctorOrOperatorOrPatient,
    IsSuperUserOrAdminOrOperator,
    IsSuperUserOrAdminOrOperatorOrDoctor,
    IsSuperUserOrAdminOrPatientOrOperator,
)
from apps.booking_diagnostic.serializer import BookingDiagnosticSerializer


class BookingDiagnosticListCreateAPIView(ListCreateAPIView):
    queryset = BookingDiagnosticModel.objects.all()
    serializer_class = BookingDiagnosticSerializer
    filterset_class = BookingDiagnosticFilter

    def perform_create(self, serializer):
        booked_by = self.request.user
        diagnostic_service = serializer.validated_data['diagnostic_service']
        user = serializer.validated_data.get('user', booked_by)

        role = getattr(booked_by, 'role', None)
        if not (booked_by.is_superuser or booked_by.is_staff or (role and role.role == 'operator')):
            user = booked_by


        if BookingDiagnosticModel.objects.filter(user=user, diagnostic_service=diagnostic_service).exists():
            raise ValidationError(
                f"Patient {user.profile.name} already has a booking for {diagnostic_service.modality}."
            )

        serializer.save(user=user, booked_by=booked_by)


    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrOperatorOrDoctor()]
        else:
            return [IsSuperUserOrAdminOrPatientOrOperator()]

class BookingDiagnosticRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = BookingDiagnosticModel.objects.all()
    serializer_class = BookingDiagnosticSerializer
    http_method_names = ['get', 'delete']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrDoctorOrOperatorOrPatient()]
        else:
            return [IsSuperUserOrAdminOrOperator()]