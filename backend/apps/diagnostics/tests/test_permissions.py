from django.test import RequestFactory, TestCase

from apps.diagnostics.permissions import IsSuperUserOrAdmin
from apps.users.models import UserModel


class DiagnosticsTestPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        self.superuser = UserModel.objects.create_superuser(
            email='super@example.com',
            password='pass'
        )

        self.admin = UserModel.objects.create_user(
            email='admin@example.com',
            password='pass', is_staff=True
        )

    def test_is_superuser_or_admin(self):
        perm = IsSuperUserOrAdmin()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))