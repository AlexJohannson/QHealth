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

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.is_staff:
            return PatientCardModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['doctor', 'operator']:
            return PatientCardModel.objects.all()


        return PatientCardModel.objects.filter(user=user)


class PatientCardRetrieveUpdateApiView(RetrieveUpdateDestroyAPIView):
    queryset = PatientCardModel.objects.all()
    serializer_class = PatientCardSerializer
    permission_classes = [IsSuperUserAdminDoctorOrPatient]
    http_method_names = ['get', 'delete']


    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.is_staff:
            return PatientCardModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['doctor', 'operator']:
            return PatientCardModel.objects.all()


        return PatientCardModel.objects.filter(user=user)




