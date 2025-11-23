import datetime

from django.urls.base import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APITestCase

from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.diagnostics.models import DiagnosticsModel
from apps.users.models import ProfileModel, UserModel


class BookingDiagnosticTestApi(APITestCase):
    def setUp(self):
        self.patient1 = UserModel.objects.create(
            email='patientone@testone.com',
            password='patientonepassword'
        )
        self.profile1 = ProfileModel.objects.create(
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
        self.staff1 = UserModel.objects.create(
            email='admin@test.com',
            password='adminpassword'
        )
        self.profile = ProfileModel.objects.create(
            user=self.staff1,
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
        self.diagnostic1 = DiagnosticsModel.objects.create(
            modality = 'LFTs (Liver Function Tests)'
        )
        self.diagnostic_service1 = BookingDiagnosticModel.objects.create(
            diagnostic_service=self.diagnostic1,
            booked_by = self.staff1,
            user=self.patient1,
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))

        )

        self.patient2 = UserModel.objects.create(
            email='patienttwo@testone.com',
            password='patientonepassword'
        )
        self.profile2 = ProfileModel.objects.create(
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
        self.staff2 = UserModel.objects.create(
            email='superuser@test.com',
            password='adminpassword'
        )
        self.profile = ProfileModel.objects.create(
            user=self.staff2,
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
        self.diagnostic2 = DiagnosticsModel.objects.create(
            modality='Blood Glucose Test (Demermines the amount of sugar in the blood)'
        )
        self.diagnostic_service2 = BookingDiagnosticModel.objects.create(
            diagnostic_service=self.diagnostic2,
            booked_by=self.staff2,
            user=self.patient2,
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))

        )

        self.patient3 = UserModel.objects.create(
            email='patientthree@testone.com',
            password='patientonepassword'
        )
        self.profile3 = ProfileModel.objects.create(
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
        self.diagnostic3 = DiagnosticsModel.objects.create(
            modality='Ultrasound (Sonography)'
        )
        self.diagnostic_servic3 = BookingDiagnosticModel.objects.create(
            diagnostic_service=self.diagnostic3,
            booked_by=self.patient3,
            user=self.patient3,
        )

        self.patient4 = UserModel.objects.create(
            email='patientfour@testone.com',
            password='patientonepassword'
        )
        self.profile4 = ProfileModel.objects.create(
            user=self.patient4,
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
        self.staff4 = UserModel.objects.create(
            email='staff@test.com',
            password='adminpassword'
        )
        self.profile = ProfileModel.objects.create(
            user=self.staff4,
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
        self.diagnostic4 = DiagnosticsModel.objects.create(
            modality='X-ray (Uses radiation to capture images of bones and centrain internal organs)'
        )

        self.patient5 = UserModel.objects.create(
            email='patientfive@testone.com',
            password='patientonepassword'
        )
        self.profile5 = ProfileModel.objects.create(
            user=self.patient5,
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
        self.diagnostic5 = DiagnosticsModel.objects.create(
            modality='Thyroid Function Tests (Measures levers of TSH, T3 and T4 hormones)'
        )


    def _authenticate_staff(self):
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

    def _authenticate_patient(self):
        user = UserModel.objects.create_user(
            email='admin@create.com',
            password='AdminNQ@!1'
        )
        user.is_active = True
        user.is_superuser = False
        user.is_staff = False
        user.save()
        res = self.client.post(reverse('auth_login'), {'email': user.email, 'password': 'AdminNQ@!1'})
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + res.data['access'])

    def test_get_all_bookings_diagnostics_list(self):
        self._authenticate_staff()
        res = self.client.get(reverse('booking_diagnostic_list_create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 3)

    def test_create_new_booking_diagnostic_by_staff(self):
        self._authenticate_staff()
        res = self.client.post(
            reverse('booking_diagnostic_list_create'),
            data={
                'user_id':self.patient4.id,
                'diagnostics_id': self.diagnostic4.id,
                'booked_by_id': self.staff4.id,
                'date_time': '2025-12-01 09:00:00'
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_new_booking_diagnostic_by_patient(self):
        self._authenticate_patient()
        res = self.client.post(
            reverse('booking_diagnostic_list_create'),
            data={
                'user_id': self.patient5.id,
                'diagnostics_id': self.diagnostic5.id,
                'booked_by_id': self.patient5.id,
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_new_same_booking_diagnostic(self):
        self._authenticate_staff()
        res = self.client.post(
            reverse('booking_diagnostic_list_create'),
            data={
                'user_id': self.patient2.id,
                'diagnostics_id': self.diagnostic2.id,
                'booked_by_id': self.staff2.id,
                'date_time': '2025-12-01 09:00:00'
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("detail", res.data)
        self.assertEqual(
            res.data["detail"],
            f"Patient {self.patient2.profile.name} already has a booking for {self.diagnostic2.modality}."
        )

    def test_get_booking_diagnostic_by_id(self):
        self._authenticate_staff()
        res = self.client.get(
            reverse('booking_diagnostic_retrieve_update',
                    kwargs={'pk': self.diagnostic_servic3.id}
                    )
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_booking_diagnostic_by_id(self):
        self._authenticate_staff()
        res = self.client.delete(
            reverse('booking_diagnostic_retrieve_update',
                    kwargs={'pk': self.diagnostic_servic3.id}
                    )
        )
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

