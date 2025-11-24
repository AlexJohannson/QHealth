from django.test import TestCase

from apps.patient_recipe.filter import PatientRecipeFilter
from apps.patient_recipe.models import PatientRecipeModel
from apps.users.models import ProfileModel, UserModel


class PatientRecipeTestFilter(TestCase):
    def setUp(self):
        self.patient1 = UserModel.objects.create(
            email='patient@testone.com',
            password='patientpassword'
        )
        self.patient1.profile = ProfileModel.objects.create(
            user=self.patient1,
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
        self.recipe1 = PatientRecipeModel.objects.create(
            user=self.patient1,
            recipe='MMMMMMMM',
            description='PPPPPPPPPP'
        )

        self.patient2 = UserModel.objects.create(
            email='patientone@testone.com',
            password='patientpassword'
        )
        self.patient2.profile = ProfileModel.objects.create(
            user=self.patient2,
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
        self.recipe2 = PatientRecipeModel.objects.create(
            user=self.patient2,
            recipe='SSSSSSSSSS',
            description='PPPPPPPPPP'
        )

        self.patient3 = UserModel.objects.create(
            email='patienttwo@testone.com',
            password='patientpassword'
        )
        self.patient3.profile = ProfileModel.objects.create(
            user=self.patient3,
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
        self.recipe3 = PatientRecipeModel.objects.create(
            user=self.patient3,
            recipe='NNNNNNNNNNNNNNNNNNNNNNNN',
            description='PPPPPPPPP'
        )

    def test_diagnosis_filter(self):
        queryset = PatientRecipeModel.objects.all()
        filtered = PatientRecipeFilter({'recipe': 'SSSSSSSSSS'}, queryset=queryset).qs
        self.assertIn(self.recipe2, filtered)
        self.assertNotIn(self.recipe3, filtered)
        self.assertNotIn(self.recipe1, filtered)