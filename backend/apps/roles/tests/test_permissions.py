from django.test import RequestFactory, TestCase

from apps.roles.models import RolesModels
from apps.roles.permissions import IsSuperUserOrAdmin, IsSuperUserOrOperator, IsSuperUserOrRoleOwner
from apps.users.models import UserModel


class RoleTestPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        self.superuser = UserModel.objects.create_superuser(email='super@example.com', password='pass')
        self.admin = UserModel.objects.create_user(email='admin@example.com', password='pass', is_staff=True)
        self.user = UserModel.objects.create_user(email='user@example.com', password='pass')

        self.other_user = UserModel.objects.create_user(email='other@example.com', password='pass')

        self.user_with_role_doctor = UserModel.objects.create_user(email='doctor@example.com', password='pass')
        self.doctor_role = RolesModels.objects.create(
            user=self.user_with_role_doctor,
            role='doctor',
            specialty='Cardiology'
        )

        self.user_with_role_operator = UserModel.objects.create_user(email='operaator@example.com', password='pass')
        self.operator_role = RolesModels.objects.create(
            user=self.user_with_role_operator,
            role='operator',
        )

        self.user_with_role_pharmacist = UserModel.objects.create_user(email='pharmacist@example.com', password='pass')
        self.pharmacist_role = RolesModels.objects.create(
            user=self.user_with_role_pharmacist,
            role='pharmacist',
        )


    def test_is_superuser_or_admin_only(self):
        perm = IsSuperUserOrAdmin()
        req = self.factory.get('/')
        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user
        self.assertFalse(perm.has_permission(req, None))

        req.user = self.user_with_role_doctor
        self.assertFalse(perm.has_permission(req, None))

        req.user = self.user_with_role_operator
        self.assertFalse(perm.has_permission(req, None))

        req.user = self.user_with_role_pharmacist
        self.assertFalse(perm.has_permission(req, None))

    def test_is_superuser_or_admin_or_owner_or_role(self):
        perm = IsSuperUserOrRoleOwner()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))


        req.user = self.user
        self.assertFalse(perm.has_object_permission(req, None, self.doctor_role))

        req.user = self.user_with_role_doctor
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.doctor_role))

        req.user = self.user_with_role_operator
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.operator_role))

        req.user = self.user_with_role_pharmacist
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.pharmacist_role))

        req.user = self.other_user
        self.assertFalse(perm.has_permission(req, None))
        self.assertFalse(perm.has_object_permission(req, None, self.doctor_role))

    def test_is_superuser_or_admin_or_operator(self):
        perm = IsSuperUserOrOperator()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user
        self.assertFalse(perm.has_permission(req, None))

        req.user = self.user_with_role_doctor
        self.assertFalse(perm.has_permission(req, None))

        req.user = self.user_with_role_operator
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user_with_role_pharmacist
        self.assertFalse(perm.has_permission(req, None))


