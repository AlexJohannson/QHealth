from django_filters import rest_framework as filters


class BookingDoctorFilter(filters.FilterSet):
    specialty = filters.CharFilter(field_name='doctor__role__specialty', lookup_expr='icontains')
    doctor_name = filters.CharFilter(field_name='doctor__profile__name', lookup_expr='icontains')
    doctor_surname = filters.CharFilter(field_name='doctor__profile__surname', lookup_expr='icontains')
    patient_name = filters.CharFilter(field_name='user__profile__name', lookup_expr='icontains')
    patient_surname = filters.CharFilter(field_name='user__profile__surname', lookup_expr='icontains')
    status = filters.CharFilter(field_name='status', lookup_expr='icontains')
    order = filters.OrderingFilter(
        fields=(
            'id',
        )
    )