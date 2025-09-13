from django.urls import path

from apps.booking_diagnostic.views import (
    BookingDiagnosticListCreateAPIView,
    BookingDiagnosticRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    path('', BookingDiagnosticListCreateAPIView.as_view(), name='booking_diagnostic_list_create'),
    path('/<int:pk>', BookingDiagnosticRetrieveUpdateDestroyAPIView.as_view(), name='booking_diagnostic_retrieve_update'),
]