from django.urls import path

from apps.booking_doctor.views import BookingDoctorListCreateAPIView, BookingDoctorRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', BookingDoctorListCreateAPIView.as_view(), name='booking_doctor_list_create'),
    path('/<int:pk>', BookingDoctorRetrieveUpdateDestroyAPIView.as_view(), name='booking_doctor_retrieve_update'),
]