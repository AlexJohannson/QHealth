from django.test import TestCase

from rest_framework.exceptions import ValidationError

from apps.users.models import UserModel


class TestUserModel(TestCase):
    def test_username_field_is_email(self):
        self.assertEqual(UserModel.USERNAME_FIELD, "email")

    def test_user_model_default_flags(self):
        user = UserModel()
        self.assertFalse(user.is_active)
        self.assertFalse(user.is_staff)

    def test_delete_user_without_bookings(self):
        user = UserModel.objects.create(email="nobookings@example.com")
        try:
            user.delete()
        except ValidationError:
            self.fail("User without bookings should be deletable")

    def test_delete_user_with_bookings_raises(self):
        user = UserModel.objects.create(email="hasbookings@example.com")
        user.has_bookings = lambda: True
        with self.assertRaises(ValidationError) as context:
            user.delete()
        self.assertIn("forbidden to delete a user", str(context.exception))