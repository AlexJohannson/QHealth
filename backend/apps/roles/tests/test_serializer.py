
from django.test import TestCase

from apps.roles.models import RolesModels
from apps.roles.serializer import RolesWriteSerializer
from apps.users.models import ProfileModel, UserModel


class RolesTestSerializer(TestCase):
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

    def test_serializer_validate_doctor_data(self):
        data = {
            'role': 'doctor',
            'specialty': 'Psykholog',
            'user': {
                'email': 'doctorvalid@testone.com',
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serializer_validate_operator_data(self):
        data = {
            'role': 'operator',
            'user': {
                'email': 'operatorvalid@testone.com',
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serializer_validate_pharmacist_data(self):
        data = {
            'role': 'pharmacist',
            'user': {
                'email': 'pharmacistvalid@testone.com',
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serializer_role_save(self):
        data = {
            'role': 'doctor',
            'specialty': 'Psykholog',
            'user': {
                'email': 'doctorsave@testone.com',
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()

    def test_serializer_invalid_data_doctor(self):
        data = {
            'role': 'doctor',
            'user': {
                'email': 'doctorinvalid@testone.com',
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('specialty', serializer.errors)
        self.assertEqual(serializer.errors['specialty'][0], 'This field is required for doctors.')


    def test_serializer_invalid_data_operator(self):
        data = {
            'role': 'operator',
            'specialty': 'Psykholog',
            'user': {
                'email': 'operatorinvalid@testone.com',
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('specialty', serializer.errors)
        self.assertEqual(serializer.errors['specialty'][0], 'Specialty is only allowed for doctors.')


    def test_serializer_role_invalid_data(self):
        data = {
            'role': 'doctor',
            'specialty': 'Psykholog',
            'user': {
                'email': 'doctorinvaliddata@testone.com',
                'password': 'AdminNQ@!1',
                'profile': {
                    'name': "alla",
                    'surname': "",
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
        }
        serializer = RolesWriteSerializer(data=data)
        self.assertFalse(serializer.is_valid(), serializer.errors)