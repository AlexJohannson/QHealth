from django_filters import rest_framework as filters


class SecurityFilter(filters.FilterSet):
    success = filters.BooleanFilter(field_name='success')
    order = filters.OrderingFilter(
        fields=(
            'id',
            'success',
            'created_at',
        )
    )