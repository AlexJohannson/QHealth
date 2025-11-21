from datetime import datetime

from django.test import TestCase

from apps.security.models import LoginAttempt


class SecurityTestModel(TestCase):
    def test_create_login_attempt_success(self):
        attempt = LoginAttempt.objects.create(
            email="test@example.com",
            ip_address="192.168.0.1",
            success=True
        )

        self.assertIsNotNone(attempt.id)

        self.assertEqual(attempt.email, "test@example.com")

        self.assertEqual(attempt.ip_address, "192.168.0.1")

        self.assertTrue(attempt.success)

        self.assertIsInstance(attempt.timestamp, datetime)

    def test_create_login_attempt_without_email(self):
        attempt = LoginAttempt.objects.create(
            email=None,
            ip_address="10.0.0.1",
            success=False
        )

        self.assertIsNone(attempt.email)

        self.assertFalse(attempt.success)
