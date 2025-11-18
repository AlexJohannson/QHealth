from django.urls import path

from apps.roles.views import (
    RoleDoctorApiView,
    RolesDoctorById,
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
    path('/doctor_list', RoleDoctorApiView.as_view(), name='doctor-list'),
    path('/doctor_list/<int:pk>', RolesDoctorById.as_view(), name='doctor-list-get-by-id'),
]