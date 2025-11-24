from django.test import TestCase

from apps.patient_recipe.models import PatientRecipeModel
from apps.users.models import ProfileModel, UserModel


class PatientRecipeModelTest(TestCase):
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

    def test_model_patient_recipe(self):
        self.assertEqual(self.recipe1.recipe, 'MMMMMMMM')
        self.assertEqual(self.recipe1.description, 'PPPPPPPPPP')
