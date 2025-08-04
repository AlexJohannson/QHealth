from datetime import date, timedelta

from django_filters import rest_framework as filters


class UsersFilter(filters.FilterSet):
    icontains_name = filters.CharFilter(field_name='profile__name', lookup_expr='icontains')
    icontains_surname = filters.CharFilter(field_name='profile__surname', lookup_expr='icontains')
    min_age = filters.NumberFilter(method='filter_min_age')
    max_age = filters.NumberFilter(method='filter_max_age')
    date_of_birth = filters.DateFilter(field_name='profile__date_of_birth')
    icontains_city = filters.CharFilter(field_name='profile__city', lookup_expr='icontains')
    icontains_country = filters.CharFilter(field_name='profile__country', lookup_expr='icontains')
    gender= filters.CharFilter(field_name='profile__gender')



    def filter_min_age(self, queryset, name, value):
        today = date.today()
        value = int(value)
        max_birth_day = date(today.year - value, today.month, today.day)
        return queryset.filter(profile__date_of_birth__lte=max_birth_day)

    def filter_max_age(self, queryset, name, value):
        today = date.today()
        value = int(value)
        min_birth_day = date(today.year - value - 1, today.month, today.day) + timedelta(days=1)
        return queryset.filter(profile__date_of_birth__gte=min_birth_day)

