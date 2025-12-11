from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from django_filters.rest_framework import DjangoFilterBackend

from apps.patient_card.filter import PatientCardFilter
from apps.patient_card.models import PatientCardModel
from apps.patient_card.permissions import IsSuperUserAdminDoctorOrPatient
from apps.patient_card.serializer import PatientCardSerializer


class PatientCardListApiView(ListCreateAPIView):
    """
    get:
        Get patient card list
    post:
        Create new patient card
    """
    queryset = PatientCardModel.objects.all()
    serializer_class = PatientCardSerializer
    permission_classes = [IsSuperUserAdminDoctorOrPatient]
    filter_backends = [DjangoFilterBackend]
    filterset_class = PatientCardFilter

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return PatientCardModel.objects.none()

        if user.is_superuser or user.is_staff:
            return PatientCardModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['doctor', 'operator']:
            return PatientCardModel.objects.all()

        return PatientCardModel.objects.filter(user=user)


class PatientCardRetrieveUpdateApiView(RetrieveUpdateDestroyAPIView):
    """
    get:
        Get patient card detail by ID
    delete:
        Delete patient card by ID
    """
    queryset = PatientCardModel.objects.all()
    serializer_class = PatientCardSerializer
    permission_classes = [IsSuperUserAdminDoctorOrPatient]
    http_method_names = ['get', 'delete']

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return PatientCardModel.objects.none()

        if user.is_superuser or user.is_staff:
            return PatientCardModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['doctor', 'operator']:
            return PatientCardModel.objects.all()

        return PatientCardModel.objects.filter(user=user)
