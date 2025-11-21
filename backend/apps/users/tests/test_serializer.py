from django.test import TestCase

from apps.users.models import ProfileModel, UserModel
from apps.users.serializer import UserSerializer


class TestUserSerializer(TestCase):
    def setUp(self):
        self.user = UserModel.objects.create(
            email='user@testone.com',
            password='userpassword'
        )

        self.profile = ProfileModel.objects.create(
            user=self.user,
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

    def test_serialize_valid_data(self):
        data = {
            'email': 'user@valid.com',
            'password': 'AdminNQ@!1',
            'profile': {
                'name': 'Userone',
                'surname': 'One',
                'phone_number': '+46720000000',
                'date_of_birth': '1986-09-01',
                'height': 180,
                'weight': 88,
                'street': 'Street',
                'house': 1,
                'city': 'City',
                'region': 'Region',
                'country': 'Country',
                'gender': 'Male'
            }
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serialize_user_create(self):
        data = {
            'email': 'user@create.com',
            'password': 'AdminNQ@!1',
            'profile': {
                'name': 'Userone',
                'surname': 'One',
                'phone_number': '+46720000000',
                'date_of_birth': '1986-09-01',
                'height': 180,
                'weight': 88,
                'street': 'Street',
                'house': 1,
                'city': 'City',
                'region': 'Region',
                'country': 'Country',
                'gender': 'Male'
            }
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, data['email'])
        self.assertEqual(user.profile.name, data['profile']['name'])

    def test_serialize_user_update(self):
        update_data = {
            'profile': {
                'name': 'Updated',
            }
        }
        serializer = UserSerializer(instance=self.user, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.profile.name, update_data['profile']['name'])

    def test_invalid_data(self):
        invalid_data = {
            'email': 'invaliduser@example.com',
            'password': 'AdminNQ@!1',
            'profile': {
                'name': '',
                'surname': '',
                'age': 'invalid_age',
                'house': 'not_a_number',
            }
        }
        serializer = UserSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile', serializer.errors)

    def test_validate_date_of_birth(self):
        validate_date_of_birth = {
            'profile': {
                'age': 16
            }
        }
        serializer = UserSerializer(data=validate_date_of_birth)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile', serializer.errors)


    def test_validate_height(self):
        validate_height = {
            'profile': {
                'height': 0,
            }
        }
        serializer = UserSerializer(data=validate_height)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile', serializer.errors)

    def test_validate_weight(self):
        validate_weight = {
            'profile': {
                'weight': 0,
            }
        }
        serializer = UserSerializer(data=validate_weight)
        self.assertFalse(serializer.is_valid())
        self.assertIn('profile', serializer.errors)
