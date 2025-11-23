import datetime

from django.test import TestCase
from django.utils import timezone

from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.booking_diagnostic.serializer import BookingDiagnosticSerializer
from apps.diagnostics.models import DiagnosticsModel
from apps.users.models import ProfileModel, UserModel


class BookingDiagnosticTestSerializer(TestCase):
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
        self.staff1 = UserModel.objects.create(
            email='admin@test.com',
            password='adminpassword'
        )
        self.profile = ProfileModel.objects.create(
            user=self.staff1,
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
        self.diagnostic1 = DiagnosticsModel.objects.create(
            modality='LFTs (Liver Function Tests)'
        )
        self.diagnostic_service1 = BookingDiagnosticModel.objects.create(
            diagnostic_service=self.diagnostic1,
            booked_by=self.staff1,
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
        self.diagnostic3 = DiagnosticsModel.objects.create(
            modality='Ultrasound (Sonography)'
        )
        self.diagnostic_service3 = BookingDiagnosticModel.objects.create(
            diagnostic_service=self.diagnostic3,
            booked_by=self.patient3,
            user=self.patient3,
        )



    def test_serializer_booking_diagnostic_valid_data(self):
        serializer = BookingDiagnosticSerializer(self.diagnostic_service1)
        data = serializer.data
        self.assertEqual(data['diagnostic_service']['modality'], 'LFTs (Liver Function Tests)')
        self.assertEqual(data['booked_by']['email'], self.staff1.email)
        self.assertEqual(data['booked_by']['profile']['surname'], 'Smith')
        self.assertEqual(data['user']['email'], self.patient1.email)
        self.assertEqual(data['user']['profile']['name'], 'John')


    def test_serializer_valid_data_booked_by_staff(self):
        data= {
            'user_id': self.patient2.id,
            'diagnostics_id': self.diagnostic2.id,
            'booked_by_id': self.staff2.id,
            'date_time': '2025-01-02 09:00'
        }
        serializer = BookingDiagnosticSerializer(data=data)
        self.assertFalse(serializer.is_valid(), serializer.errors)



    def test_serializer_invalid_data_booking_diagnostic(self):
        data = {
            'user_id': '',
            'diagnostics_id': self.diagnostic3.id,
            'booked_by_id': '',
            'date_time': '2025-01-02 09:00'
        }
        serializer = BookingDiagnosticSerializer(data=data)
        self.assertFalse(serializer.is_valid(), serializer.errors)










