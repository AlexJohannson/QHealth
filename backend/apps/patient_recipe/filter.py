from django_filters import rest_framework as filters


class PatientRecipeFilter(filters.FilterSet):
    recipe = filters.CharFilter(field_name='recipe', lookup_expr='icontains')