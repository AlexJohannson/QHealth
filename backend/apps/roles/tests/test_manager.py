from django.test import TestCase

from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class RoleTestManager(TestCase):
    def setUp(self):
        self.doctor = UserModel.objects.create_user(
            email='doctor@testone.com',
            password='AdminNQ@!1'
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

    def test_create_user_with_role(self):
        role = RolesModels.objects.get(user=self.doctor)
        self.assertEqual(role.user.email, "doctor@testone.com")
        self.assertTrue(role.user.check_password("AdminNQ@!1"))
        self.assertEqual(role.role, 'doctor')
        self.assertEqual(role.specialty, 'Therapist')
        self.assertFalse(role.user.is_staff)
        self.assertFalse(role.user.is_superuser)
        self.assertFalse(role.user.is_active)

    def test_create_role_without_email_raises(self):
        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_user(email=None, password="pass")
        self.assertIn("Email must be provided", str(ctx.exception))

    def test_create_role_without_password_raises(self):
        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_user(email="user@example.com", password=None)
        self.assertIn("Password must be provided", str(ctx.exception))