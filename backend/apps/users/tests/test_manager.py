from django.test import TestCase

from apps.users.models import UserModel


class TestUserManager(TestCase):
    def test_create_user_success(self):
        user = UserModel.objects.create_user(
            email="user@example.com",
            password="SecurePass1@"
        )
        self.assertEqual(user.email, "user@example.com")
        self.assertTrue(user.check_password("SecurePass1@"))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_active)

    def test_create_user_without_email_raises(self):
        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_user(email=None, password="pass")
        self.assertIn("Email must be provided", str(ctx.exception))

    def test_create_user_without_password_raises(self):
        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_user(email="user@example.com", password=None)
        self.assertIn("Password must be provided", str(ctx.exception))

    def test_create_superuser_success(self):
        superuser = UserModel.objects.create_superuser(
            email="admin@example.com",
            password="AdminPass1@"
        )
        self.assertEqual(superuser.email, "admin@example.com")
        self.assertTrue(superuser.check_password("AdminPass1@"))
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_active)

    def test_create_superuser_invalid_flags(self):
        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_superuser(
                email="admin@example.com",
                password="AdminPass1@",
                is_staff=False
            )
        self.assertIn("Superuser must be is_staff", str(ctx.exception))

        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_superuser(
                email="admin@example.com",
                password="AdminPass1@",
                is_superuser=False
            )
        self.assertIn("Superuser must be is_superuser", str(ctx.exception))

        with self.assertRaises(ValueError) as ctx:
            UserModel.objects.create_superuser(
                email="admin@example.com",
                password="AdminPass1@",
                is_active=False
            )
        self.assertIn("Superuser must be is_active", str(ctx.exception))