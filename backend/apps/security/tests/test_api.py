from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.security.models import LoginAttempt
from apps.users.models import UserModel


class SecurityTestApi(APITestCase):
    def setUp(self):
        self.security1 = LoginAttempt.objects.create(
            email='userone@test.com',
            ip_address='127.0.0.1',
            timestamp='2025-11-16 12:34:27.639744',
            success=True
        )

        self.security2 = LoginAttempt.objects.create(
            email='usertwo@test.com',
            ip_address='127.0.0.5',
            timestamp='2025-11-16 12:34:27.639744',
            success=True
        )
        self.security3 = LoginAttempt.objects.create(
            email='admin@test.com',
            ip_address='127.0.0.6',
            timestamp='2025-11-16 12:34:27.639744',
            success=True
        )
        self.security4 = LoginAttempt.objects.create(
            email='superuser@test.com',
            ip_address='127.0.0.3',
            timestamp='2025-11-16 12:34:27.639744',
            success=True
        )

    def _authenticate(self):
        user = UserModel.objects.create_user(
            email='user@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = False
        user.is_staff = True
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])

    def test_get_all_security(self):
        self._authenticate()
        res = self.client.get(reverse('security-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 5)

    def test_delete_security(self):
        self._authenticate()
        res = self.client.delete(reverse(
            'security-destroy',
            kwargs={'pk': self.security1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
