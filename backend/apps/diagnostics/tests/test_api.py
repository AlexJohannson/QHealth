from django.urls.base import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from apps.diagnostics.models import DiagnosticsModel
from apps.users.models import UserModel


class DiagnosticsTestApi(APITestCase):
    def setUp(self):
        self.diagnostics1 = DiagnosticsModel.objects.create(
            modality='MRI (Magnetic Resonance Imaging)'
        )

        self.diagnostics2 = DiagnosticsModel.objects.create(
            modality='CT Scan (Computed Tomography)'
        )

        self.diagnostics3 = DiagnosticsModel.objects.create(
            modality= 'Urinalysis (Analyzes urine for sings of infection and other conditions)'
        )

        self.diagnostics4 = DiagnosticsModel.objects.create(
            modality='LFTs (Liver Function Tests)'
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

    def test_get_all_list_of_diagnostics(self):
        self._authenticate()
        res = self.client.get(reverse('diagnostics-list-create'))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['data']), 4)

    def test_create_new_diagnostic(self):
        self._authenticate()
        res = self.client.post(
            reverse('diagnostics-list-create'),
            data={
                'modality': 'New Diagnostic',
            },
            format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['modality'], 'New Diagnostic')

    def test_get_diagnostic_by_id(self):
        self._authenticate()
        res = self.client.get(
            reverse(
                'diagnostics-retrieve-update',
                kwargs={'pk': self.diagnostics1.id}
            ))
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_diagnostic_by_id(self):
        self._authenticate()
        updated_diagnostic = {
            'modality': 'Update New Diagnostic'
        }
        res = self.client.patch(
            reverse(
                'diagnostics-retrieve-update',
                kwargs={'pk': self.diagnostics2.id}),
            updated_diagnostic
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        
    def test_delete_diagnostic_by_id(self):
        self._authenticate()
        res = self.client.delete(
            reverse(
                'diagnostics-retrieve-update',
                kwargs={'pk': self.diagnostics4.id}
            ))
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)