from django.test import TestCase

from apps.users.filter import UsersFilter
from apps.users.models import ProfileModel, UserModel


class TestUserFilter(TestCase):
    def setUp(self):
        self.user1 = UserModel.objects.create_user(email='userone@test.com', password='password')

        self.user1.profile = ProfileModel.objects.create(
            user=self.user1,
            name="Stiven",
            surname="Kokos",
            phone_number="+46720000000",
            date_of_birth="1998-09-01",
            height=180,
            weight=88,
            street="Norra Parkvegen",
            house=1,
            city="Svalov",
            region="Skone",
            country="Sweden",
            gender="Male"
        )

        self.user2 = UserModel.objects.create_user(email='userotwo@test.com', password='password')

        self.user2.profile = ProfileModel.objects.create(
            user=self.user2,
            name="Nadiia",
            surname="Abrikos",
            phone_number="+46720000000",
            date_of_birth="1990-12-21",
            height=165,
            weight=68,
            street="Panas Myrnyi",
            house=12,
            city="Kyiv",
            region="Kyiv",
            country="Ukraine",
            gender="Female"
        )

    def test_icontains_name(self):
        queryset = UserModel.objects.all()
        filtered = UsersFilter({'icontains_name': 'Nadiia'}, queryset=queryset).qs
        self.assertIn(self.user2, filtered)
        self.assertNotIn(self.user1, filtered)

    def test_icontains_surname(self):
        queryset = UserModel.objects.all()
        filtered = UsersFilter({'icontains_surname': 'Kokos'}, queryset=queryset).qs
        self.assertIn(self.user1, filtered)
        self.assertNotIn(self.user2, filtered)

    def test_age_filter(self):
        queryset = UserModel.objects.select_related("profile").all()
        filtered = UsersFilter({'min_age': 26, 'max_age': 28}, queryset=queryset).qs
        self.assertIn(self.user1, filtered)
        self.assertNotIn(self.user2, filtered)

    def test_date_of_birth_filter(self):
        queryset = UserModel.objects.select_related("profile").all()
        filtered = UsersFilter({'date_of_birth': '1998-09-01'}, queryset=queryset).qs
        self.assertIn(self.user1, filtered)
        self.assertNotIn(self.user2, filtered)

    def test_icontains_city(self):
        queryset = UserModel.objects.all()
        filtered = UsersFilter({'icontains_city': 'Kyiv'}, queryset=queryset).qs
        self.assertIn(self.user2, filtered)
        self.assertNotIn(self.user1, filtered)

    def test_icontains_country(self):
        queryset = UserModel.objects.all()
        filtered = UsersFilter({'icontains_country': 'Sweden'}, queryset=queryset).qs
        self.assertIn(self.user1, filtered)
        self.assertNotIn(self.user2, filtered)

    def test_gender_filter(self):
        queryset = UserModel.objects.all()
        filtered = UsersFilter({'gender': 'Male'}, queryset=queryset).qs
        self.assertIn(self.user1, filtered)
        self.assertNotIn(self.user2, filtered)
