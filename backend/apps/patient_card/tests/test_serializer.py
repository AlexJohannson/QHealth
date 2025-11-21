from django.test import TestCase

from apps.patient_card.models import PatientCardModel
from apps.patient_card.serializer import PatientCardSerializer
from apps.users.models import ProfileModel, UserModel


class PatientCardTestSerializer(TestCase):
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

    def test_create_patient_card(self):
        data = {
            'user_id': self.patient1.id,
            'diagnosis': 'QQQQQQQQQQQQQ',
            'description': 'MMMMMMMMMMMMMMMMM',
            'planning': 'SSSSSSSSSSSSSS',
        }
        serializer = PatientCardSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()