from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import ProfileModel, UserModel


class UsersAPITestCase(APITestCase):
    def setUp(self):
        self.admin = UserModel.objects.create(
            email='admin@test.com',
            password='adminpassword',
            is_staff=True,
            is_superuser=False,
        )

        self.admin.profile = ProfileModel.objects.create(
            user=self.admin,
            name="Admin",
            surname="Super",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="City",
            region="Region",
            country="Country",
            gender="Male"
        )

        self.superuser = UserModel.objects.create(
            email='superuser@test.com',
            password='superuserpassword',
            is_staff=True,
            is_superuser=True,
        )

        self.user1 = UserModel.objects.create(
            email='user@testone.com',
            password='userpassword'
        )
        self.user1.profile = ProfileModel.objects.create(
            user=self.user1,
            name="Userone",
            surname="One",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="City",
            region="Region",
            country="Country",
            gender="Male"
        )

        self.user2 = UserModel.objects.create(
            email='user@test.com',
            password='userpassword'
        )
        self.user2.profile = ProfileModel.objects.create(
            user=self.user2,
            name="User",
            surname="Two",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="City",
            region="Region",
            country="Country",
            gender="Male"
        )

        self.patient1 = UserModel.objects.create(
            email='patientone@test.com',
            password='patientpassword'
        )
        self.patient1.profile = ProfileModel.objects.create(
            user=self.patient1,
            name="Patientone",
            surname="One",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="City",
            region="Region",
            country="Country",
            gender="Male"
        )

        self.patient2 = UserModel.objects.create(
            email='patienttwo@test.com',
            password='patientpassword'
        )
        self.patient2.profile = ProfileModel.objects.create(
            user=self.patient2,
            name="Patienttwo",
            surname="Two",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="City",
            region="Region",
            country="Country",
            gender="Male"
        )

    def _authenticate(self):
        user = UserModel.objects.create_user(
            email='user@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])

    def test_get_all_users(self):
        self._authenticate()
        res = self.client.get(reverse('users_list_create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 5)
        users_name = ['Admin', 'Userone', 'User', 'Patientone', 'Patienttwo']
        for i, user in enumerate(ProfileModel.objects.all()):
            self.assertEqual(user.name, users_name[i])

    def test_create_user(self):
        count_before = UserModel.objects.count()
        res = self.client.post(
            reverse('users_list_create'),
            data={
                "email": "newuser@example.com",
                "password": "AdminNQ@!1",
                "profile": {
                    'name': "User",
                    'surname': "Two",
                    'phone_number': "+46720000000",
                    'date_of_birth': "1986-09-01",
                    'height': 180,
                    'weight': 88,
                    'street': "Street",
                    'house': 1,
                    'city': "City",
                    'region': "Region",
                    'country': "Country",
                    'gender': "Male"
                }
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        count_after = UserModel.objects.count()
        self.assertEqual(count_after - count_before, 1)
        self.assertEqual(res.data['profile']['name'], 'User')

    def test_get_user_by_id(self):
        self._authenticate()
        res = self.client.get(reverse(
            'users_retrieve_update',
            kwargs={'pk': self.user1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        self._authenticate()
        update_data = {
            'city': "Landskrona",
        }
        res = self.client.patch(reverse(
            'users_retrieve_update',
            kwargs={'pk': self.user1.id}),
            update_data,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        self._authenticate()
        res = self.client.delete(reverse(
            'users_retrieve_update',
            kwargs={'pk': self.user1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)


    def test_user_block(self):
        self._authenticate()
        block_data = {'is_active': True}
        res = self.client.patch(reverse(
            'user_block',
            kwargs={'pk': self.user1.id}),
            block_data,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)



    def test_user_unblock(self):
        self._authenticate()
        block_data = {'is_active': False}
        res = self.client.patch(reverse(
            'user_unblock',
            kwargs={'pk': self.user1.id}),
            block_data,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_to_admin(self):
        self._authenticate()
        res = self.client.patch(reverse(
            'user_admin',
            kwargs={'pk': self.user2.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_revoke_admin(self):
        self._authenticate()
        res = self.client.patch(reverse(
            'user_revoke_admin',
            kwargs={'pk': self.user2.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_patient_list(self):
        self._authenticate()
        res = self.client.get(reverse('user_patient'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        expected_count = UserModel.objects.filter(
            is_superuser=False,
            is_staff=False,
            role__isnull=True
        ).count()
        self.assertEqual(len(res.data['data']), expected_count)

    def test_get_patient_details(self):
        self._authenticate()
        res = self.client.get(reverse(
            'patient_retrieve',
            kwargs={'pk': self.patient1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
