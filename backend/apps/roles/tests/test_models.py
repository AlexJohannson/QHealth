from django.test import TestCase

from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class RolesTestModels(TestCase):
    def setUp(self):
        self.doctor = UserModel.objects.create(
            email='doctor@testone.com',
            password='doctorpassword'
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

        self.operator = UserModel.objects.create(
            email='operator@testone.com',
            password='doctorpassword'
        )
        self.operator.profile = ProfileModel.objects.create(
            user=self.operator,
            name="Alina",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Helsingborg",
            region="Skone",
            country="Sweden",
            gender="Female"
        )
        RolesModels.objects.create(
            user=self.operator,
            role='operator',
            is_available_for_booking=True
        )

        self.pharmacist = UserModel.objects.create(
            email='pharmacist@testone.com',
            password='doctorpassword'
        )

        self.pharmacist.profile = ProfileModel.objects.create(
            user=self.pharmacist,
            name="Alla",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Helsingborg",
            region="Skone",
            country="Sweden",
            gender="Female"
        )
        RolesModels.objects.create(
            user=self.pharmacist,
            role='pharmacist',
            is_available_for_booking=True
        )


    def test_model_doctor(self):
        role = RolesModels.objects.get(user=self.doctor)
        self.assertEqual(role.user.email, 'doctor@testone.com')
        self.assertEqual(role.role, 'doctor')
        self.assertEqual(role.specialty, 'Therapist')
        self.assertEqual(role.user.profile.name, 'John')

    def test_model_operator(self):
        role = RolesModels.objects.get(user=self.operator)
        self.assertEqual(role.user.email, 'operator@testone.com')
        self.assertEqual(role.role, 'operator')
        self.assertEqual(role.user.profile.name, 'Alina')

    def test_model_pharmacist(self):
        role = RolesModels.objects.get(user=self.pharmacist)
        self.assertEqual(role.user.email, 'pharmacist@testone.com')
        self.assertEqual(role.role, 'pharmacist')
        self.assertEqual(role.user.profile.name, 'Alla')