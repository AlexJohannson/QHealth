from django.test import RequestFactory, TestCase

from apps.roles.models import RolesModels
from apps.users.models import UserModel
from apps.users.permissions import (
    IsSuperUserAdminOrRole,
    IsSuperUserAdminOrRoleOrOwner,
    IsSuperUserOrAdminOnly,
    IsSuperUserOrAdminOrUser,
)


class TestUserPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        self.superuser = UserModel.objects.create_superuser(email='super@example.com', password='pass')
        self.admin = UserModel.objects.create_user(email='admin@example.com', password='pass', is_staff=True)
        self.user = UserModel.objects.create_user(email='user@example.com', password='pass')
        self.other_user = UserModel.objects.create_user(email='other@example.com', password='pass')


        self.user_with_role = UserModel.objects.create_user(email='doctor@example.com', password='pass')
        self.doctor_role = RolesModels.objects.create(
            user=self.user_with_role,
            role='doctor',
            specialty='Cardiology'
        )

    def test_is_superuser_or_admin_only(self):
        perm = IsSuperUserOrAdminOnly()
        req = self.factory.get('/')
        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user
        self.assertFalse(perm.has_permission(req, None))

    def test_is_superuser_or_admin_or_user(self):
        perm = IsSuperUserOrAdminOrUser()
        req = self.factory.get('/')
        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.user))

        req.user = self.admin
        self.assertTrue(perm.has_object_permission(req, None, self.user))

        req.user = self.user
        self.assertTrue(perm.has_object_permission(req, None, self.user))
        self.assertFalse(perm.has_object_permission(req, None, self.other_user))

    def test_is_superuser_admin_or_role(self):
        perm = IsSuperUserAdminOrRole()
        req = self.factory.get('/')
        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user_with_role
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user
        self.assertFalse(perm.has_permission(req, None))

    def test_is_superuser_admin_or_role_or_owner(self):
        perm = IsSuperUserAdminOrRoleOrOwner()
        req = self.factory.get('/')
        req.user = self.superuser
        self.assertTrue(perm.has_object_permission(req, None, self.user))

        req.user = self.admin
        self.assertTrue(perm.has_object_permission(req, None, self.user))

        req.user = self.user_with_role
        self.assertTrue(perm.has_object_permission(req, None, self.user))

        req.user = self.user
        self.assertTrue(perm.has_object_permission(req, None, self.user))
        self.assertFalse(perm.has_object_permission(req, None, self.other_user))