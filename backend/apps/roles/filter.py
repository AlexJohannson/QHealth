from django_filters import rest_framework as filters


class RolesFilter(filters.FilterSet):
    icontains_role = filters.CharFilter(field_name='role', lookup_expr='icontains')
    icontains_specialty = filters.CharFilter(field_name='specialty', lookup_expr='icontains')
    icontains_name = filters.CharFilter(field_name='user__profile__name', lookup_expr='icontains')
    icontains_surname = filters.CharFilter(field_name='user__profile__surname', lookup_expr='icontains')
    order = filters.OrderingFilter(
        fields=(
            'id',
        )
    )
