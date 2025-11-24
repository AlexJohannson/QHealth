

from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, SocketToken

from apps.users.models import ProfileModel, UserModel


class AuthTestApi(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create(
            email='patientone@testone.com',
            password='patientonepassword',
            is_superuser=False,
            is_staff=False,
            is_active=False,
        )
        self.profile1 = ProfileModel.objects.create(
            user=self.user,
            name="John",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )

        self.user_auth = UserModel.objects.create_user(
            email='user@testone.com',
            password='AdminNQ@!1',
            is_superuser=False,
            is_staff=False,
            is_active=True,
        )
        self.profile1 = ProfileModel.objects.create(
            user=self.user_auth,
            name="John",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )



    def _authenticate_staff(self):
        user = UserModel.objects.create_user(
            email='admin@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = False
        user.is_staff = True
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.refresh_token = res.data['refresh']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])

    def test_activate_account(self):
        self._authenticate_staff()

        token = JWTService.create_token(self.user, ActivateToken)
        url = reverse('activate_user_account', kwargs={'token': token})
        res = self.client.patch(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_active)

    def test_recovery_request(self):
        self._authenticate_staff()
        url = reverse('recovery_request')
        res = self.client.post(url, {'email': self.user.email})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['details'], 'Link send to email')

    def test_recovery_password(self):
        self._authenticate_staff()
        token = JWTService.create_token(self.user, RecoveryToken)
        url = reverse('recovery_password', kwargs={'token': token})
        res = self.client.post(url, {'password': 'NewPAssword2@!'})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('NewPAssword2@!'))

    def test_web_socket_token(self):
        self._authenticate_staff()
        url = reverse('socket_token')
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('token', res.data)
        self.assertTrue(isinstance(res.data['token'], str))

    def test_login(self):
        url = reverse('auth_login')
        res = self.client.post(url, {
            'email': self.user_auth.email,
            'password': 'AdminNQ@!1'
        })
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('access', res.data)

    def test_invalid_login(self):
        url = reverse('auth_login')
        res = self.client.post(url, {
            'email': 'invalid@email.com',
            'password': 'INVALIDPASSWORD@!!!2'
        })
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_refresh_token(self):
        self._authenticate_staff()
        url = reverse('auth_refresh')
        res = self.client.post(url, {'refresh': self.refresh_token})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('access', res.data)
        self.assertTrue(isinstance(res.data['access'], str))

    def test_qhealt_role(self):
        self._authenticate_staff()
        res = self.client.get(reverse('qhealth_role'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('is_staff', res.data)
        self.assertTrue(res.data['is_staff'])
        self.assertIn('is_superuser', res.data)
        self.assertFalse(res.data['is_superuser'])






