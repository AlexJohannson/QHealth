from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.patient_card.filter import PatientCardFilter
from apps.patient_card.models import PatientCardModel
from apps.patient_card.permissions import IsSuperUserAdminDoctorOrPatient
from apps.patient_card.serializer import PatientCardSerializer


class PatientCardListApiView(ListCreateAPIView):
    queryset = PatientCardModel.objects.all()
    serializer_class = PatientCardSerializer
    permission_classes = [IsSuperUserAdminDoctorOrPatient]
    filterset_class = PatientCardFilter



class PatientCardRetrieveUpdateApiView(RetrieveUpdateDestroyAPIView):
    queryset = PatientCardModel.objects.all()
    serializer_class = PatientCardSerializer
    permission_classes = [IsSuperUserAdminDoctorOrPatient]
    http_method_names = ['get', 'delete']


