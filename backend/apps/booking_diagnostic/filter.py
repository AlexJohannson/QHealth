from django_filters import rest_framework as filters


class BookingDiagnosticFilter(filters.FilterSet):
    diagnostic_service = filters.CharFilter(field_name='diagnostic_service__modality', lookup_expr='icontains')
    patient_name = filters.CharFilter(field_name='user__profile__name', lookup_expr='icontains')
    patient_surname = filters.CharFilter(field_name='user__profile__surname', lookup_expr='icontains')
    order = filters.OrderingFilter(
        fields=(
            'id',
        )
    )