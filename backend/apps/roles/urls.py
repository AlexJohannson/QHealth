from django.urls import path

from apps.roles.views import RolesListCreateAPIView, RolesRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', RolesListCreateAPIView.as_view(), name='roles-list-create'),
    path('/<int:pk>', RolesRetrieveUpdateDestroyAPIView.as_view(), name='roles-retrieve-update'),
]