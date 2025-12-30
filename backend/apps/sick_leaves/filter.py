from django_filters import rest_framework as filters


class SickLeaveFilter(filters.FilterSet):
    patient_name = filters.CharFilter(field_name='user__profile__name', lookup_expr='icontains')
    patient_surname = filters.CharFilter(field_name='user__profile__surname', lookup_expr='icontains')
    diagnosis = filters.CharFilter(field_name='diagnosis', lookup_expr='icontains')
    order = filters.OrderingFilter(
        fields=(
            'id',
        )
    )