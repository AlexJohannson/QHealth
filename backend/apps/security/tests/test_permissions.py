from django.test import RequestFactory, TestCase

from apps.security.permissions import IsSuperUserOrAdminOnly
from apps.users.models import UserModel


class SecurityTestPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        self.superuser = UserModel.objects.create_superuser(email='super@example.com', password='pass')
        self.admin = UserModel.objects.create_user(email='admin@example.com', password='pass', is_staff=True)
        self.user = UserModel.objects.create_user(email='user@example.com', password='pass')

    def test_is_superuser_or_admin_only(self):
        perm = IsSuperUserOrAdminOnly()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user
        self.assertFalse(perm.has_permission(req, None))
