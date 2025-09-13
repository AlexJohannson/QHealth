from django_filters import rest_framework as filters


class BookingDiagnosticFilter(filters.FilterSet):
    diagnostic_service = filters.CharFilter(field_name='diagnostic_service__modality', lookup_expr='icontains')
    booked_by = filters.CharFilter(field_name='booked_by__profile__name', lookup_expr='icontains')
    order = filters.OrderingFilter(
        fields=(
            'id',
        )
    )