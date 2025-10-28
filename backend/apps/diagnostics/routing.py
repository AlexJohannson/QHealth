from django.urls import path

from apps.diagnostics.consumer import DiagnosticsConsumer

websocket_urlpatterns = [
    path('', DiagnosticsConsumer.as_asgi()),
]