from django.urls import path

from apps.roles.views import (
    RolesListCreateAPIView,
    RolesRetrieveUpdateDestroyAPIView,
    ToggleDoctorAvailabilityAPIView,
    ToggleDoctorNotAvailabilityAPIView,
)

urlpatterns = [
    path('', RolesListCreateAPIView.as_view(), name='roles-list-create'),
    path('/<int:pk>', RolesRetrieveUpdateDestroyAPIView.as_view(), name='roles-retrieve-update'),
    path('/block_staff_doctor/<int:pk>', ToggleDoctorNotAvailabilityAPIView.as_view(), name='toggle-doctor-not-availability'),
    path('/unblock_staff_doctor/<int:pk>', ToggleDoctorAvailabilityAPIView.as_view(), name='toggle-doctor-availability'),
]