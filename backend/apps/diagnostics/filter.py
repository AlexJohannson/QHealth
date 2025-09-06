from django_filters import rest_framework as filters


class DiagnosticsFilter(filters.FilterSet):
    modality = filters.CharFilter(field_name='modality', lookup_expr='icontains')
    order = filters.OrderingFilter(
        fields=(
            'id',
        )
    )