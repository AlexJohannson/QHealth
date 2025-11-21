from django.test import TestCase

from apps.patient_card.models import PatientCardModel
from apps.users.models import ProfileModel, UserModel


class PatientCardTestModels(TestCase):
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
        self.card1 = PatientCardModel.objects.create(
            user=self.patient1,
            diagnosis='MMMMMMMM',
            description='PPPPPPPPPP',
            planning='WWWWWWWWW'
        )

    def test_model_patient_card(self):
        self.assertEqual(self.card1.diagnosis, 'MMMMMMMM')
        self.assertEqual(self.card1.description, 'PPPPPPPPPP')
        self.assertEqual(self.card1.planning, 'WWWWWWWWW')