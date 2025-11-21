from django.test import TestCase

from apps.patient_card.filter import PatientCardFilter
from apps.patient_card.models import PatientCardModel
from apps.users.models import ProfileModel, UserModel


class PatientCardTestFilter(TestCase):
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
        self.card2 = PatientCardModel.objects.create(
            user=self.patient2,
            diagnosis='SSSSSSSSSS',
            description='PPPPPPPPPP',
            planning='WWWWWWWWW'
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
        self.card3 = PatientCardModel.objects.create(
            user=self.patient3,
            diagnosis='NNNNNNNNNNNNNNNNNNNNNNNN',
            description='PPPPPPPPPP',
            planning='WWWWWWWWW'
        )

    def test_diagnosis_filter(self):
        queryset = PatientCardModel.objects.all()
        filtered = PatientCardFilter({'diagnosis': 'SSSSSSSSSS'}, queryset=queryset).qs
        self.assertIn(self.card2, filtered)
        self.assertNotIn(self.card3, filtered)
        self.assertNotIn(self.card1, filtered)