from django.urls import path

from apps.security.views import SecurityDestroyApiView, SecurityListApiView

urlpatterns = [
    path('', SecurityListApiView.as_view(), name='security-list'),
    path('/<int:pk>', SecurityDestroyApiView.as_view(), name='security-destroy'),
]