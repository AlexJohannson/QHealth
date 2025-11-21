from django.test import TestCase

from apps.security.filter import SecurityFilter
from apps.security.models import LoginAttempt


class SecurityTestFilter(TestCase):
    def setUp(self):
        self.security1 = LoginAttempt.objects.create(
            email='userone@test.com',
            ip_address='127.0.0.1',
            timestamp='2025-11-16 12:34:27',
            success=True,
            created_at= '2025-11-16 13:16:23'
        )

        self.security2 = LoginAttempt.objects.create(
            email='usertwo@test.com',
            ip_address='127.0.0.5',
            timestamp='2025-11-16 12:34:27',
            success=False,
            created_at='2025-11-16 10:16:23'
        )
        self.security3 = LoginAttempt.objects.create(
            email='admin@test.com',
            ip_address='127.0.0.6',
            timestamp='2025-11-16 12:34:27',
            success=True,
            created_at='2025-11-16 07:16:23'
        )

    def test_success(self):
        queryset = LoginAttempt.objects.all()
        filtered = SecurityFilter({'success': False}, queryset=queryset).qs
        self.assertIn(self.security2, filtered)
        self.assertNotIn(self.security3, filtered)

    def test_ordering_id(self):
        queryset = LoginAttempt.objects.all()
        filtered = SecurityFilter({'order': 'id'}, queryset=queryset).qs
        self.assertEqual(list(filtered), [self.security1, self.security2, self.security3])

    def test_ordering_success(self):
        queryset = LoginAttempt.objects.all()
        filtered = SecurityFilter({'success': 'True'}, queryset=queryset).qs
        self.assertEqual(list(filtered), [self.security1, self.security3])

    def test_ordering_created_at(self):
        queryset = LoginAttempt.objects.all()
        filtered = SecurityFilter({'order': '-created_at'}, queryset=queryset).qs
        self.assertEqual(list(filtered), [self.security3, self.security2, self.security1])