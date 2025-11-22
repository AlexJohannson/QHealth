import datetime

from django.urls.base import reverse
from django.utils import timezone

from rest_framework import status
from rest_framework.test import APITestCase

from apps.booking_doctor.models import BookingDoctorModel
from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class BookingDoctorTestApi(APITestCase):
    def setUp(self):
        self.patient1 = UserModel.objects.create(
            email='patientone@testone.com',
            password='patientonepassword'
        )
        self.profile = ProfileModel.objects.create(
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
        self.doctor_user1 = UserModel.objects.create(
            email='doctor@example.com',
            password='doctorpassword'
        )
        self.doctor_profile1 = ProfileModel.objects.create(
            user=self.doctor_user1,
            name='Aibolit',
            surname='Kokos',
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
        self.doctor_role1 = RolesModels.objects.create(
            user=self.doctor_user1,
            role='doctor',
            specialty='Neurolog'
        )
        self.booking_doctor1 = BookingDoctorModel.objects.create(
            doctor=self.doctor_user1,
            user=self.patient1,
            status='booked',
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))

        )

        self.patient2 = UserModel.objects.create(
            email='patienttwo@testone.com',
            password='patienttwopassword'
        )
        self.profile = ProfileModel.objects.create(
            user=self.patient2,
            name="Alla",
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
            gender="Female"
        )
        self.doctor_user2 = UserModel.objects.create(
            email='doctortwo@example.com',
            password='doctorpassword'
        )
        self.doctor_profile2 = ProfileModel.objects.create(
            user=self.doctor_user2,
            name='Aibolit',
            surname='Kokos',
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
        self.doctor_role2 = RolesModels.objects.create(
            user=self.doctor_user2,
            role='doctor',
            specialty='Psykholog'
        )
        self.booking_doctor2 = BookingDoctorModel.objects.create(
            doctor=self.doctor_user2,
            user=self.patient2,
            status='booked',
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))
        )

        self.patient3 = UserModel.objects.create(
            email='patientthree@testone.com',
            password='patienttwopassword'
        )
        self.profile = ProfileModel.objects.create(
            user=self.patient3,
            name="Ole",
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
        self.doctor_user3 = UserModel.objects.create(
            email='doctorthree@example.com',
            password='doctorpassword'
        )

        self.doctor_profile3 = ProfileModel.objects.create(
            user=self.doctor_user3,
            name='Aibolit',
            surname='Kokos',
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
        self.doctor_role3 = RolesModels.objects.create(
            user=self.doctor_user3,
            role='doctor',
            specialty='Kokos'
        )
        self.booking_doctor3 = BookingDoctorModel.objects.create(
            doctor=self.doctor_user3,
            user=self.patient3,
            status='booked',
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))

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

    def test_get_all_booking_doctors_list(self):
        self._authenticate()
        res = self.client.get(reverse('booking_doctor_list_create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 3)


    def test_create_new_booking_doctor(self):
        self._authenticate()
        res = self.client.post(
            reverse('booking_doctor_list_create'),
            data={
                'user_id': self.patient1.id,
                'doctor_id': self.doctor_user3.id,
                'status': 'booked',
                'date_time': '2025-12-01T09:00:00Z'
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['status'], 'booked')

    def test_booking_doctor_by_id(self):
        self._authenticate()
        res = self.client.get(
            reverse(
                'booking_doctor_retrieve_update',
                kwargs={'pk': self.booking_doctor2.id}
            ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_booking_doctor_delete_by_id(self):
        self._authenticate()
        res = self.client.delete(
            reverse(
                'booking_doctor_retrieve_update',
                kwargs={'pk': self.booking_doctor1.id}
            ))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

    def test_booking_doctor_cancelled(self):
        self._authenticate()
        cancelled_data = {
            'status': 'booked'
        }
        res = self.client.patch(
            reverse(''
                    'booking_doctor_cancel',
                    kwargs={'pk': self.booking_doctor3.id}),
                    cancelled_data
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
