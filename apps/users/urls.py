from django.urls import path

from apps.users.views import UsersListCreateApiView, UsersRetrieveUpdateDestroyApiView

urlpatterns = [
    path('', UsersListCreateApiView.as_view(), name='users-list-create'),
    path('/<int:pk>', UsersRetrieveUpdateDestroyApiView.as_view(), name='users-retrieve-update'),
]