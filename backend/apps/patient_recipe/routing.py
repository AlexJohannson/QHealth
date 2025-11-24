from django.urls import path

from apps.patient_recipe.consumer import PatientRecipeConsumer

websocket_urlpatterns = [
    path('', PatientRecipeConsumer.as_asgi()),
]