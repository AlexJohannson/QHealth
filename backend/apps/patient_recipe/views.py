from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from django_filters.rest_framework import DjangoFilterBackend

from apps.patient_recipe.filter import PatientRecipeFilter
from apps.patient_recipe.models import PatientRecipeModel
from apps.patient_recipe.permissions import IsSuperUserAdminPharmacistOrPatient
from apps.patient_recipe.serializer import PatientRecipeSerializer


class PatientRecipeListCreateApiView(ListCreateAPIView):
    """
        get:
            Get patients recipes list
        post:
            Create new patient recipe
        """
    queryset = PatientRecipeModel.objects.all()
    serializer_class = PatientRecipeSerializer
    permission_classes = [IsSuperUserAdminPharmacistOrPatient]
    filter_backends = [DjangoFilterBackend]
    filterset_class = PatientRecipeFilter

    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return PatientRecipeModel.objects.none()

        if user.is_superuser or user.is_staff:
            return PatientRecipeModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['doctor', 'operator', 'pharmacist']:
            return PatientRecipeModel.objects.all()

        return PatientRecipeModel.objects.filter(user=user)

class PatientRecipeRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    """
        get:
            Get patient recipe detail by ID
        delete:
            Delete patient recipe by ID
        """
    queryset = PatientRecipeModel.objects.all()
    serializer_class = PatientRecipeSerializer
    permission_classes = [IsSuperUserAdminPharmacistOrPatient]
    http_method_names = ['get', 'delete']


    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return PatientRecipeModel.objects.none()

        if user.is_superuser or user.is_staff:
            return PatientRecipeModel.objects.all()

        role = getattr(user, 'role', None)
        if role and role.role in ['doctor', 'operator', 'pharmacist']:
            return PatientRecipeModel.objects.all()

        return PatientRecipeModel.objects.filter(user=user)
