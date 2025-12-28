from django.urls import path

from apps.users.views import (
    BlockUserView,
    PatientRetrieveUpdateDestroyApiView,
    UnBlockUserView,
    UserPatientApiView,
    UserRevokeAdminView,
    UsersListCreateApiView,
    UsersRetrieveUpdateDestroyApiView,
    UserToAdminView,
    VerifyEmailView,
)

urlpatterns = [
    path('', UsersListCreateApiView.as_view(), name='users_list_create'),
    path('/verify_email/<str:token>', VerifyEmailView.as_view(), name='verify_email'),
    path('/<int:pk>', UsersRetrieveUpdateDestroyApiView.as_view(), name='users_retrieve_update'),
    path('/<int:pk>/block', BlockUserView.as_view(), name='user_block'),
    path('/<int:pk>/unblock', UnBlockUserView.as_view(), name='user_unblock'),
    path('/<int:pk>/create_admin', UserToAdminView.as_view(), name='user_admin'),
    path('/<int:pk>/revoke_admin', UserRevokeAdminView.as_view(), name='user_revoke_admin'),
    path('/patient', UserPatientApiView.as_view(), name='user_patient'),
    path('/patient/<int:pk>', PatientRetrieveUpdateDestroyApiView.as_view(), name='patient_retrieve'),
]