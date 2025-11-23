import datetime

from django.test import TestCase
from django.utils import timezone

from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.diagnostics.models import DiagnosticsModel
from apps.users.models import ProfileModel, UserModel


class BookingDiagnosticTestModel(TestCase):
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

    def test_model_booking_diagnostic(self):
        self.assertEqual(self.diagnostic_service1.diagnostic_service.modality, 'LFTs (Liver Function Tests)')
        self.assertEqual(self.diagnostic_service1.booked_by.email, 'admin@test.com')
        self.assertEqual(self.diagnostic_service1.booked_by.profile.surname, 'Smith')
        self.assertEqual(self.diagnostic_service1.user.email, 'patientone@testone.com')
        self.assertEqual(self.diagnostic_service1.user.profile.name, 'John')