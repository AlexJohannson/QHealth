from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.booking_doctor.filter import BookingDoctorFilter
from apps.booking_doctor.models import BookingDoctorModel
from apps.booking_doctor.permissions import (
    IsSuperUserOrAdminOrOperator,
    IsSuperUserOrAdminOrOperatorOrDoctor,
    IsSuperUserOrAdminOrOperatorOrDoctorOrPatient,
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
