import datetime

from django.test import TestCase
from django.utils import timezone

from apps.booking_diagnostic.filter import BookingDiagnosticFilter
from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.diagnostics.models import DiagnosticsModel
from apps.users.models import ProfileModel, UserModel


class BookingDiagnosticTestFilter(TestCase):
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

    def test_booking_diagnostic_diagnostic_service_filter(self):
        queryset = BookingDiagnosticModel.objects.all()
        filtered = BookingDiagnosticFilter(
            {'diagnostic_service': 'Blood Glucose Test (Demermines the amount of sugar in the blood)'},
            queryset=queryset
        ).qs
        self.assertIn(self.diagnostic_service2, filtered)
        self.assertNotIn(self.diagnostic_service1, filtered)

    def test_booking_diagnostic_order_filter(self):
        queryset = BookingDiagnosticModel.objects.all()
        filtered = BookingDiagnosticFilter({'order': '-id'}, queryset=queryset).qs
        self.assertEqual(list(filtered), [self.diagnostic_service2, self.diagnostic_service1])