from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class RoleTestApi(APITestCase):
    def setUp(self):
        self.doctor = UserModel.objects.create(
            email='doctor@testone.com',
            password='doctorpassword'
        )
        self.doctor.profile = ProfileModel.objects.create(
            user=self.doctor,
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
        RolesModels.objects.create(
            user=self.doctor,
            role='doctor',
            specialty='Therapist',
            is_available_for_booking=True
        )

        self.doctor1 = UserModel.objects.create(
            email='doctorone@testone.com',
            password='doctorpassword'
        )
        self.doctor1.profile = ProfileModel.objects.create(
            user=self.doctor1,
            name="Kokos",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Svalov",
            region="Skone",
            country="Sweden",
            gender="Male"
        )
        RolesModels.objects.create(
            user=self.doctor1,
            role='doctor',
            specialty='Psykholog',
            is_available_for_booking=True
        )

        self.operator = UserModel.objects.create(
            email='operator@testone.com',
            password='doctorpassword'
        )
        self.operator.profile = ProfileModel.objects.create(
            user=self.operator,
            name="Alina",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Helsingborg",
            region="Skone",
            country="Sweden",
            gender="Female"
        )
        RolesModels.objects.create(
            user=self.operator,
            role='operator',
            is_available_for_booking=True
        )

        self.pharmacist = UserModel.objects.create(
            email='pharmacist@testone.com',
            password='doctorpassword'
        )
        self.pharmacist.profile = ProfileModel.objects.create(
            user=self.pharmacist,
            name="Alla",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Helsingborg",
            region="Skone",
            country="Sweden",
            gender="Female"
        )
        RolesModels.objects.create(
            user=self.pharmacist,
            role='pharmacist',
            is_available_for_booking=True
        )

    def _authenticate(self):
        user = UserModel.objects.create_user(
            email='admin@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = False
        user.is_staff = True
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])

    def test_get_all_roles(self):
        self._authenticate()
        res = self.client.get(reverse('roles-list-create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 4)
        users_name = ['John', 'Kokos', 'Alina', 'Alla']
        for i, user in enumerate(ProfileModel.objects.all()):
            self.assertEqual(user.name, users_name[i])

    def test_create_role_doctor(self):
        self._authenticate()
        res = self.client.post(
            reverse('roles-list-create'),
            data={
                'role': 'doctor',
                'specialty': 'Psykholog',
                'user': {
                    'email': 'doctorcreate@testone.com',
                    'password': 'AdminNQ@!1',
                    'profile': {
                        'name': "Alla",
                        'surname': "Smith",
                        'phone_number': "+46720000000",
                        'date_of_birth': "1986-09-01",
                        'height': 180,
                        'weight': 88,
                        'street': "Street",
                        'house': 1,
                        'city': "Helsingborg",
                        'region': "Skone",
                        'country': "Sweden",
                        'gender': "Female"
                    }
                }
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['role'], 'doctor')
        self.assertEqual(res.data['specialty'], 'Psykholog')
        self.assertEqual(res.data['user']['email'], 'doctorcreate@testone.com')
        self.assertEqual(res.data['user']['profile']['city'], 'Helsingborg')

    def test_create_role_pharmacist(self):
        self._authenticate()
        res = self.client.post(
            reverse('roles-list-create'),
            data={
                'role': 'pharmacist',
                'user': {
                    'email': 'pharmacistcreate@testone.com',
                    'password': 'AdminNQ@!1',
                    'profile': {
                        'name': "Alla",
                        'surname': "Smith",
                        'phone_number': "+46720000000",
                        'date_of_birth': "1986-09-01",
                        'height': 180,
                        'weight': 88,
                        'street': "Street",
                        'house': 1,
                        'city': "Landskrona",
                        'region': "Skone",
                        'country': "Sweden",
                        'gender': "Female"
                    }
                }
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['role'], 'pharmacist')
        self.assertEqual(res.data['user']['email'], 'pharmacistcreate@testone.com')
        self.assertEqual(res.data['user']['profile']['city'], 'Landskrona')

    def test_create_role_operator(self):
        self._authenticate()
        res = self.client.post(
            reverse('roles-list-create'),
            data={
                'role': 'operator',
                'user': {
                    'email': 'operatorcreate@testone.com',
                    'password': 'AdminNQ@!1',
                    'profile': {
                        'name': "Alla",
                        'surname': "Smith",
                        'phone_number': "+46720000000",
                        'date_of_birth': "1986-09-01",
                        'height': 180,
                        'weight': 88,
                        'street': "Street",
                        'house': 1,
                        'city': "Malmo",
                        'region': "Skone",
                        'country': "Sweden",
                        'gender': "Female"
                    }
                }
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['role'], 'operator')
        self.assertEqual(res.data['user']['email'], 'operatorcreate@testone.com')
        self.assertEqual(res.data['user']['profile']['city'], 'Malmo')

    def test_get_all_roles_doctor(self):
        self._authenticate()
        res = self.client.get(reverse('doctor-list'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 2)

    def test_get_role_doctor_by_id(self):
        self._authenticate()
        role = RolesModels.objects.get(user=self.doctor)
        res = self.client.get(reverse(
            'doctor-list-get-by-id',
            kwargs={'pk': role.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_get_role_by_id(self):
        self._authenticate()
        role = RolesModels.objects.get(user=self.operator)
        res = self.client.get(reverse(
            'roles-retrieve-update',
            kwargs={'pk': role.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_block_role_doctor(self):
        self._authenticate()
        role = RolesModels.objects.get(user=self.doctor)
        block_data = {
            "is_available_for_booking": True,
        }
        res = self.client.patch(reverse(
            'toggle-doctor-not-availability',
            kwargs={'pk': role.id}),
            block_data,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_unblock_role_doctor(self):
        self._authenticate()
        role = RolesModels.objects.get(user=self.doctor)
        block_data = {
            "is_available_for_booking": False,
        }
        res = self.client.patch(reverse(
            'toggle-doctor-availability',
            kwargs={'pk': role.id}),
            block_data,
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
