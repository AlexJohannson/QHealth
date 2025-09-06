from django.urls import path

from apps.diagnostics.views import DiagnosticsCreateListApiView, DiagnosticsRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', DiagnosticsCreateListApiView.as_view(), name='diagnostics-list-create'),
    path('/<int:pk>', DiagnosticsRetrieveUpdateDestroyAPIView.as_view(), name='diagnostics-retrieve-update'),
]