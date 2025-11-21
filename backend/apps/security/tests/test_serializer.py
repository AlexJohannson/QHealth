from django.test import TestCase

from apps.security.models import LoginAttempt
from apps.security.serializer import SecuritySerializer


class SecurityTestSerializer(TestCase):
    def setUp(self):
        self.security = LoginAttempt.objects.create(
            email='userone@test.com',
            ip_address='127.0.0.1',
            timestamp='2025-11-16 12:34:27',
            success=True,
            created_at='2025-11-16 12:34:27',
            updated_at='2025-11-16 12:34:27',
        )

    def test_serializer_valid_data(self):
        data = {
            'email': 'userone@test.com',
            'ip_address': '127.0.0.1',
            'timestamp': '2025-11-16 12:34:27',
            'success': True,
            'created_at': '2025-11-16 12:34:27',
            'updated_at': '2025-11-16 12:34:27',
        }
        serializer = SecuritySerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_serializer_security_save(self):
        data = {
            'email': 'usertwo@test.com',
            'ip_address': '127.0.0.5',
            'timestamp': '2025-11-16 12:34:27',
            'success': False,
            'created_at': '2025-11-16 12:34:27',
            'updated_at': '2025-11-16 12:34:27',
        }
        serializer = SecuritySerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()

    def test_security_serializer_invalid_data(self):
        data = {
            'email': 'other@test.com',
            'ip_address': '',
            'timestamp': '2025-11-16 12:34:27',
            'success': True,
            'created_at': '2025-11-16 12:34:27',
            'updated_at': '2025-11-16 12:34:27',
        }
        serializer = SecuritySerializer(data=data)
        self.assertFalse(serializer.is_valid(), serializer.errors)
