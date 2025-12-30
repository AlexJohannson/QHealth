from django.urls import path

from apps.sick_leaves.views import SickLeavesCreateApiView, SickLeavesRetrieveDestroyApiView

urlpatterns = [
    path('', SickLeavesCreateApiView.as_view(), name='sick-leaves-list-create'),
    path('/<int:pk>', SickLeavesRetrieveDestroyApiView.as_view(), name='sick-leaves-retrieve-update')
]