from django_filters import rest_framework as filters


class PatientCardFilter(filters.FilterSet):
    diagnosis = filters.CharFilter(field_name='diagnosis', lookup_expr='icontains')