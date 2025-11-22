import datetime

from django.test import TestCase
from django.utils import timezone

from apps.booking_doctor.filter import BookingDoctorFilter
from apps.booking_doctor.models import BookingDoctorModel
from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class BookingDoctorTestFilter(TestCase):
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
            name='Shrek',
            surname='Smith',
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
            status='cancelled',
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))
        )
        
    def test_doctor_specialty_filter(self):
        queryset = BookingDoctorModel.objects.all()
        filtered = BookingDoctorFilter({'specialty': 'Neurolog'}, queryset=queryset).qs
        self.assertIn(self.booking_doctor1, filtered)
        self.assertNotIn(self.booking_doctor2, filtered)

    def test_doctor_name_filter(self):
        queryset = BookingDoctorModel.objects.all()
        filtered = BookingDoctorFilter({'doctor_name': 'Aibolit'}, queryset=queryset).qs
        self.assertIn(self.booking_doctor2, filtered)
        self.assertNotIn(self.booking_doctor1, filtered)

    def test_doctor_surname_filter(self):
        queryset = BookingDoctorModel.objects.all()
        filtered = BookingDoctorFilter({'doctor_surname': 'Kokos'}, queryset=queryset).qs
        self.assertIn(self.booking_doctor2, filtered)
        self.assertNotIn(self.booking_doctor1, filtered)

    def test_booking_doctor_status_filter(self):
        queryset = BookingDoctorModel.objects.all()
        filtered = BookingDoctorFilter({'status': 'booked'}, queryset=queryset).qs
        self.assertIn(self.booking_doctor1, filtered)
        self.assertNotIn(self.booking_doctor2, filtered)

    def test_booking_doctor_order_id(self):
        queryset = BookingDoctorModel.objects.all()
        filtered = BookingDoctorFilter({'order': '-id'}, queryset=queryset).qs
        self.assertEqual(list(filtered), [self.booking_doctor2, self.booking_doctor1])