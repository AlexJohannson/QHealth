import datetime

from django.test import TestCase
from django.utils import timezone

from apps.booking_doctor.models import BookingDoctorModel
from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class BookingDoctorTestModels(TestCase):
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

    def test_model_booking_doctor(self):
        self.assertEqual(self.booking_doctor1.status, 'booked')
        self.assertEqual(self.doctor_role1.specialty, 'Neurolog')
        self.assertEqual(self.doctor_profile1.name, 'Aibolit')
        self.assertEqual(self.doctor_user1.email, 'doctor@example.com')
        self.assertEqual(self.patient1.email, 'patientone@testone.com')
        self.assertEqual(self.patient1.profile.surname, 'Smith')