from django.test import RequestFactory, TestCase

from apps.patient_card.models import PatientCardModel
from apps.patient_card.permissions import IsSuperUserAdminDoctorOrPatient
from apps.roles.models import RolesModels
from apps.users.models import UserModel


class PatientCardTestPermissions(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

        self.superuser = UserModel.objects.create_superuser(email='super@example.com', password='pass')
        self.admin = UserModel.objects.create_user(email='admin@example.com', password='pass', is_staff=True)

        self.user_owner = UserModel.objects.create_user(
            email='user@example.com',
            password='pass'
        )
        self.card_owner = PatientCardModel.objects.create(
            user=self.user_owner,
            diagnosis="Diag",
            description="Desc",
            planning="Plan"
        )


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

        self.user_with_role_pharmacist = UserModel.objects.create_user(email='pharmacist@example.com', password='pass')
        self.pharmacist_role = RolesModels.objects.create(
            user=self.user_with_role_pharmacist,
            role='pharmacist',
        )

    def test_is_superuser_or_admin_or_doctor_or_patient(self):
        perm = IsSuperUserAdminDoctorOrPatient()
        req = self.factory.get('/')

        req.user = self.superuser
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.superuser))

        req.user = self.admin
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.admin))

        req.user = self.user_with_role_doctor
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.doctor_role))

        req.user = self.user_owner
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.card_owner))

        req.user = self.user_with_role_pharmacist
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.pharmacist_role))

        req.user = self.user_with_role_operator
        self.assertTrue(perm.has_permission(req, None))
        self.assertTrue(perm.has_object_permission(req, None, self.operator_role))





