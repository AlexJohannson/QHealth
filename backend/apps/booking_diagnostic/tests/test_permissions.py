import datetime

from django.test import RequestFactory, TestCase
from django.utils import timezone

from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.booking_diagnostic.permissions import (
    IsSuperUserOrAdminOrDoctorOrOperatorOrPatient,
    IsSuperUserOrAdminOrOperator,
    IsSuperUserOrAdminOrPatientOrOperator,
)
from apps.diagnostics.models import DiagnosticsModel
from apps.roles.models import RolesModels
from apps.users.models import UserModel


class BookingDiagnosticTestPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        self.superuser = UserModel.objects.create_superuser(email='super@example.com', password='pass')
        self.admin = UserModel.objects.create_user(email='admin@example.com', password='pass', is_staff=True)
        self.user_owner = UserModel.objects.create_user(email='user@example.com', password='pass')

        self.user_with_role_doctor = UserModel.objects.create_user(email='doctor@example.com', password='pass')
        self.doctor_role = RolesModels.objects.create(
            user=self.user_with_role_doctor,
            role='doctor',
            specialty='Cardiology'
        )

        self.user_with_role_operator = UserModel.objects.create_user(email='operaator@example.com', password='pass')
        self.operator_role = RolesModels.objects.create(
            user=self.user_with_role_operator,
            role='operator',
        )
        self.diagnostic = DiagnosticsModel.objects.create(
            modality='LFTs (Liver Function Tests)'
        )

        self.booking_diagnostic = BookingDiagnosticModel.objects.create(
            diagnostic_service=self.diagnostic,
            booked_by=self.admin,
            user=self.user_owner,
            date_time=timezone.make_aware(datetime.datetime(2025, 11, 26, 17, 48))
        )

    def test_is_superuser_or_admin_or_operator(self):
        perm = IsSuperUserOrAdminOrOperator()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))

        req.user = self.user_with_role_operator
        self.assertTrue(perm.has_permission(req, None))

    def test_is_superuser_or_admin_or_doctor_or_operator_or_patient(self):
        perm = IsSuperUserOrAdminOrDoctorOrOperatorOrPatient()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.admin
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.user_with_role_operator
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.user_with_role_doctor
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.user_owner
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))
        
    def test_is_superuser_or_admin_or_operator_or_patient(self):
        perm = IsSuperUserOrAdminOrPatientOrOperator()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.user_with_role_operator
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))

        req.user = self.user_owner
        self.assertTrue(perm.has_object_permission(req, None, self.booking_diagnostic))
