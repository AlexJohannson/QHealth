from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.response import Response

from core.tasks.send_booking_doctor_email_task import send_booking_doctor_email_task
from core.tasks.send_cancelled_booking_doctor_email_tasl import send_cancelled_booking_doctor_email_task

from apps.booking_doctor.filter import BookingDoctorFilter
from apps.booking_doctor.models import BookingDoctorModel
from apps.booking_doctor.permissions import (
    IsSuperUserOrAdminOrOperator,
    IsSuperUserOrAdminOrOperatorOrDoctorOrPatient,
    IsSuperUserOrAdminOrOperatorOrPatient,
)
from apps.booking_doctor.serializer import BookingDoctorSerializer


class BookingDoctorListCreateAPIView(ListCreateAPIView):
    serializer_class = BookingDoctorSerializer
    filterset_class = BookingDoctorFilter


    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrOperatorOrDoctorOrPatient()]
        return [IsSuperUserOrAdminOrOperator()]

    def perform_create(self, serializer):
        booking = serializer.save()
        send_booking_doctor_email_task.delay(booking.id)

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.is_staff:
            return BookingDoctorModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['operator', 'doctor']:
            return BookingDoctorModel.objects.all()

        return BookingDoctorModel.objects.filter(user=user)


class BookingDoctorRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = BookingDoctorModel.objects.all()
    serializer_class = BookingDoctorSerializer
    http_method_names = ['get', 'delete']


    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrOperatorOrDoctorOrPatient()]
        return [IsSuperUserOrAdminOrOperator()]

class BookingDoctorCancelAPIView(UpdateAPIView):
    queryset = BookingDoctorModel.objects.all()
    serializer_class = BookingDoctorSerializer
    http_method_names = ['patch']
    permission_classes = [IsSuperUserOrAdminOrOperatorOrPatient]

    def partial_update(self, request, *args, **kwargs):
        booking = self.get_object()
        booking.status = 'cancelled'
        booking.save()
        send_cancelled_booking_doctor_email_task.delay(booking.id)
        return self.get_response(booking)

    def get_response(self, booking):
        serializer = self.get_serializer(booking)
        return Response(serializer.data)



