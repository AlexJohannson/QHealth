from django.test import TestCase

from apps.auth.serializer import EmailSerializer, PasswordSerializer, UserRoleSerializer
from apps.users.models import UserModel


class AuthTestSerializer(TestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            email='testuser@example.com',
            password='StrongPassword123'
        )

    def test_email_serializer_valid(self):
        data = {'email': 'valid@example.com'}
        serializer = EmailSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['email'], data['email'])

    def test_email_serializer_invalid(self):
        data = {'email': 'invalid-email'}
        serializer = EmailSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_password_serializer_valid(self):
        data = {'password': 'NewPassword123@!'}
        serializer = PasswordSerializer(instance=self.user, data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['password'], data['password'])

    def test_password_serializer_invalid_missing_password(self):
        data = {}
        serializer = PasswordSerializer(instance=self.user, data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_qhealt_role_serializer(self):
        data = {
            'id': 1,
            'is_superuser': False,
            'is_staff': False,
            'is_user': True,
            'role': None,
            'role_id': None,
            'specialty': None,
        }
        serializer = UserRoleSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        validated = serializer.validated_data
        self.assertEqual(validated['is_staff'], data['is_staff'])
        self.assertEqual(validated['is_user'], data['is_user'])
        self.assertEqual(validated['role'], data['role'])
        self.assertEqual(validated['specialty'], data['specialty'])

    def test_qhealth_role_serializer_invalid_missing_fields(self):
        data = {
            'id': 2,
            'is_user': True,
            'role': None,
        }
        serializer = UserRoleSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('is_superuser', serializer.errors)
        self.assertIn('is_staff', serializer.errors)
        self.assertIn('role_id', serializer.errors)
        self.assertIn('specialty', serializer.errors)
