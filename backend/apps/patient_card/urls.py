from django.urls import path

from apps.patient_card.views import PatientCardListApiView, PatientCardRetrieveUpdateApiView

urlpatterns = [
    path('', PatientCardListApiView.as_view(), name='patient-card-list-create'),
    path('/<int:pk>', PatientCardRetrieveUpdateApiView.as_view(), name='patient-card-retrieve-update'),
]