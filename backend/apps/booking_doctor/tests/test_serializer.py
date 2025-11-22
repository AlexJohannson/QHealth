import datetime

from django.test import TestCase
from django.utils import timezone

from apps.booking_doctor.models import BookingDoctorModel
from apps.booking_doctor.serializer import BookingDoctorSerializer
from apps.roles.models import RolesModels
from apps.users.models import ProfileModel, UserModel


class BookingDoctorTestSerializer(TestCase):
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
            date_of_birth=datetime.date(1986, 9, 1),
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
            date_of_birth=datetime.date(1986, 9, 1),
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

        self.doctor_user2 = UserModel.objects.create(
            email='doctortwo@newexample.com',
            password='doctorpassword'
        )
        self.doctor_profile2 = ProfileModel.objects.create(
            user=self.doctor_user2,
            name='Aibolit',
            surname='Kokos',
            phone_number="+46720000000",
            date_of_birth=datetime.date(1986, 9, 1),
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




        self.unavailable_doctor = UserModel.objects.create(
            email='doctor_unavailable@test.com',
            password='pass'
        )
        self.profile = ProfileModel.objects.create(
            user=self.unavailable_doctor,
            name='Aibolit',
            surname='Kokos',
            phone_number="+46720000000",
            date_of_birth=datetime.date(1986, 9, 1),
            height=180,
            weight=88,
            street="Street",
            house=1,
            city="Malmo",
            region="Skone",
            country="Sweden",
            gender="Male"
        )
        RolesModels.objects.create(
            user=self.unavailable_doctor,
            role='doctor',
            specialty='Cardiology',
            is_available_for_booking=False
        )

    def test_serialization_valid_data(self):
        serializer = BookingDoctorSerializer(self.booking_doctor1)
        data = serializer.data

        self.assertEqual(data['status'], 'booked')
        self.assertTrue(data['is_active'])
        self.assertEqual(data['user']['email'], self.patient1.email)
        self.assertEqual(data['doctor']['specialty'], 'Neurolog')
        self.assertEqual(data['doctor']['surname'], 'Kokos')

    def test_create_serializer_valid_data(self):
        data = {
            'user_id': self.patient1.id,
            'doctor_id': self.doctor_user2.id,
            'status': 'booked',
            'date_time': '2025-12-01 09:00:00'
        }
        serializer = BookingDoctorSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        booking = serializer.save()
        self.assertEqual(booking.user, self.patient1)
        self.assertEqual(booking.doctor, self.doctor_user2)
        self.assertEqual(booking.status, 'booked')
        self.assertTrue(booking.is_active)

    def test_serializer_invalid_data_same_user_and_doctor(self):
        data = {
            'user_id': self.doctor_user1.id,
            'doctor_id': self.doctor_user1.id,
            'status': 'booked',
            'date_time': '2025-12-01T09:00:00Z'
        }
        serializer = BookingDoctorSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('Details', serializer.errors)
        self.assertEqual(
        serializer.errors['Details'][0],
        'You cannot book a vist to yourself!'
        )

    def test_validate_doctor_id_unavailable_doctor(self):
        data = {
            'user_id': self.patient1.id,
            'doctor_id': self.unavailable_doctor.id,
            'status': 'booked',
            'date_time': '2025-12-01T09:00:00Z'
        }
        serializer = BookingDoctorSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('doctor_id', serializer.errors)
        self.assertIn('Details', serializer.errors['doctor_id'])
        self.assertEqual(
            str(serializer.errors['doctor_id']['Details']),
            'The selected user has no role assigned.'
        )


    def test_serializer_validate_duplicate_booking_doctor(self):
        BookingDoctorModel.objects.create(
            doctor=self.doctor_user1,
            user=self.patient1,
            status='booked',
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))
        )
        data = {
            'user_id': self.patient1.id,
            'doctor_id': self.doctor_user1.id,
            'status': 'booked',
            'date_time': '2025-12-02T09:00:00Z'
        }
        serializer = BookingDoctorSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('Details', serializer.errors)
        self.assertEqual(
            str(serializer.errors['Details'][0]),
            'Patient already have a reservation with this doctor!'
        )

