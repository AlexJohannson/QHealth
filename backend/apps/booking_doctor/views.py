from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.response import Response

from apps.booking_doctor.filter import BookingDoctorFilter
from apps.booking_doctor.models import BookingDoctorModel
from apps.booking_doctor.permissions import (
    IsSuperUserOrAdminOrOperator,
    IsSuperUserOrAdminOrOperatorOrDoctor,
    IsSuperUserOrAdminOrOperatorOrDoctorOrPatient,
    IsSuperUserOrAdminOrOperatorOrPatient,
)
from apps.booking_doctor.serializer import BookingDoctorSerializer


class BookingDoctorListCreateAPIView(ListCreateAPIView):
    queryset = BookingDoctorModel.objects.all()
    serializer_class = BookingDoctorSerializer
    filterset_class = BookingDoctorFilter

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsSuperUserOrAdminOrOperatorOrDoctor()]
        return [IsSuperUserOrAdminOrOperator()]


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
        return self.get_response(booking)

    def get_response(self, booking):
        serializer = self.get_serializer(booking)
        return Response(serializer.data)



