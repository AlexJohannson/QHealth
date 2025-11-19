from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from core.tasks.send_patient_booking_diagnostic_by_staff import send_patient_booking_diagnostic_by_staff
from core.tasks.send_patient_booking_diagnostic_email_task import send_patient_booking_diagnostic_email_task

from apps.booking_diagnostic.filter import BookingDiagnosticFilter
from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.booking_diagnostic.permissions import (
    IsSuperUserOrAdminOrDoctorOrOperatorOrPatient,
    IsSuperUserOrAdminOrOperator,
    IsSuperUserOrAdminOrPatientOrOperator,
)
from apps.booking_diagnostic.serializer import BookingDiagnosticSerializer


class BookingDiagnosticListCreateAPIView(ListCreateAPIView):
    """
    get:
        Get list of booking diagnostics
    post:
        Create new booking diagnostic
    """
    serializer_class = BookingDiagnosticSerializer
    filterset_class = BookingDiagnosticFilter

    def get_queryset(self):
        user = self.request.user
        role = getattr(user, 'role', None)

        if user.is_superuser or user.is_staff or (role and role.role in ['operator', 'doctor']):
            return BookingDiagnosticModel.objects.all()

        return BookingDiagnosticModel.objects.filter(user=user)


    def perform_create(self, serializer):
        booked_by = self.request.user
        diagnostic_service = serializer.validated_data['diagnostic_service']
        user = serializer.validated_data.get('user', booked_by)

        role = getattr(booked_by, 'role', None)
        if not (booked_by.is_superuser or booked_by.is_staff or (role and role.role == 'operator')):
            user = booked_by


        if BookingDiagnosticModel.objects.filter(user=user, diagnostic_service=diagnostic_service).exists():
            raise ValidationError({
                "detail":f"Patient {user.profile.name} already has a booking for {diagnostic_service.modality}."
            })

        booking = serializer.save(user=user, booked_by=booked_by)

        is_self_booking = (user == booked_by)

        if is_self_booking:
            send_patient_booking_diagnostic_email_task.delay(booking.id)
        else:
            send_patient_booking_diagnostic_by_staff.delay(booking.id)


    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrDoctorOrOperatorOrPatient()]
        else:
            return [IsSuperUserOrAdminOrPatientOrOperator()]

class BookingDiagnosticRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
    get:
        Diagnostic details by Id
    delete:
        Delete diagnostic by Id
    """
    queryset = BookingDiagnosticModel.objects.all()
    serializer_class = BookingDiagnosticSerializer
    http_method_names = ['get', 'delete']

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrDoctorOrOperatorOrPatient()]
        else:
            return [IsSuperUserOrAdminOrOperator()]