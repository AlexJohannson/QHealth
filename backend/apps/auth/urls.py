from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.auth.views import ActivateUserAccountView, RecoveryPasswordView, RecoveryRequestView, WebSocketTokenView

urlpatterns = [
    path('', TokenObtainPairView.as_view(), name='auth_login'),
    path('/refresh', TokenRefreshView.as_view(), name='auth_refresh'),
    path('/activate/<str:token>', ActivateUserAccountView.as_view(), name='activate_user_account'),
    path('/recovery', RecoveryRequestView.as_view(), name='recovery_request'),
    path('/recovery_password/<str:token>', RecoveryPasswordView.as_view(), name='recovery_password'),
    path('/socket', WebSocketTokenView.as_view(), name='socket_token'),
]