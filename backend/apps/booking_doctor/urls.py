from django.urls import path

from apps.booking_doctor.views import (
    BookingDoctorCancelAPIView,
    BookingDoctorListCreateAPIView,
    BookingDoctorRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path('', BookingDoctorListCreateAPIView.as_view(), name='booking_doctor_list_create'),
    path('/<int:pk>', BookingDoctorRetrieveUpdateDestroyAPIView.as_view(), name='booking_doctor_retrieve_update'),

    path('/cancelled/<int:pk>', BookingDoctorCancelAPIView.as_view(), name='booking_doctor_cancel'),
]