from django.urls import path

from apps.patient_recipe.views import PatientRecipeListCreateApiView, PatientRecipeRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', PatientRecipeListCreateApiView.as_view(), name='patient-recipe-list-create'),
    path('/<int:pk>', PatientRecipeRetrieveUpdateDestroyAPIView.as_view(), name='patient-recipe-retrieve-update'),
]