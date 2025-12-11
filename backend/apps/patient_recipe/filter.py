from django_filters import rest_framework as filters


class PatientRecipeFilter(filters.FilterSet):
    recipe = filters.CharFilter(field_name='recipe', lookup_expr='icontains')
    patient_name = filters.CharFilter(field_name='user__profile__name', lookup_expr='icontains')
    patient_surname = filters.CharFilter(field_name='user__profile__surname', lookup_expr='icontains')