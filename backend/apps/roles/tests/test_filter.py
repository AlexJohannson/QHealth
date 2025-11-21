from django.test import TestCase

from apps.roles.filter import RolesFilter
from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class RolesTestFilter(TestCase):
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
            height=200,
            weight=120,
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

        self.doctor1 = UserModel.objects.create(
            email='doctorone@testone.com',
            password='doctorpassword'
        )
        self.doctor1.profile = ProfileModel.objects.create(
            user=self.doctor1,
            name="John",
            surname="Smith",
            phone_number="+46720000000",
            date_of_birth="1986-09-01",
            height=200,
            weight=120,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )
        RolesModels.objects.create(
            user=self.doctor1,
            role='doctor',
            specialty='Psychology',
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
            weight=68,
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
            height=185,
            weight=98,
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

    def test_icontains_role(self):
        queryset = RolesModels.objects.all()
        filtered = RolesFilter({'icontains_role': 'operator'}, queryset=queryset).qs
        operator_role = RolesModels.objects.get(user=self.operator)
        doctor_role = RolesModels.objects.get(user=self.doctor)
        pharmacist_role = RolesModels.objects.get(user=self.pharmacist)

        self.assertIn(operator_role, filtered)
        self.assertNotIn(doctor_role, filtered)
        self.assertNotIn(pharmacist_role, filtered)

    def test_icontains_specialty(self):
        queryset = RolesModels.objects.all()
        filtered = RolesFilter({'icontains_specialty': 'Therapist'}, queryset=queryset).qs
        doctor_role = RolesModels.objects.get(user=self.doctor)
        doctor_role1= RolesModels.objects.get(user=self.doctor1)
        self.assertIn(doctor_role, filtered)
        self.assertNotIn(doctor_role1, filtered)

    def test_order_by_id(self):
        queryset = RolesModels.objects.all()
        filtered = RolesFilter({'order': '-id'}, queryset=queryset).qs
        operator_role = RolesModels.objects.get(user=self.operator)
        doctor_role = RolesModels.objects.get(user=self.doctor)
        pharmacist_role = RolesModels.objects.get(user=self.pharmacist)
        doctor_role1 = RolesModels.objects.get(user=self.doctor1)
        self.assertEqual(list(filtered), [pharmacist_role, operator_role, doctor_role1, doctor_role])