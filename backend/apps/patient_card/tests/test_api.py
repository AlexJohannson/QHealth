from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.patient_card.models import PatientCardModel
from apps.users.models import ProfileModel, UserModel


class PatientCardTestApi(APITestCase):
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
            description= 'PPPPPPPPPP',
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

    def _authenticate(self):
        user = UserModel.objects.create_user(
            email='admin@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = False
        user.is_staff = True
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])

    def test_get_all_patient_cards(self):
        self._authenticate()
        res = self.client.get(reverse('patient-card-list-create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 3)

    def test_create_new_patient_card(self):
        self._authenticate()
        res = self.client.post(
            reverse('patient-card-list-create'),
            data={
                'user_id': self.patient1.id,
                'diagnosis': 'New Patient Card',
                'description': 'New Patient Card',
                'planning': 'New Patient Card'
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['diagnosis'], 'New Patient Card')
        self.assertEqual(res.data['description'], 'New Patient Card')
        self.assertEqual(res.data['planning'], 'New Patient Card')


    def test_get_patient_card_by_id(self):
        self._authenticate()
        res = self.client.get(reverse(
            'patient-card-retrieve-update',
            kwargs={'pk': self.card1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_patient_card_by_id(self):
        self._authenticate()
        res = self.client.delete(reverse(
            'patient-card-retrieve-update',
            kwargs={'pk': self.card1.id}
        ))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)