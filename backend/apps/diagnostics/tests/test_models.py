from django.test import TestCase

from apps.diagnostics.models import DiagnosticsModel


class DiagnosticsTestModels(TestCase):
    def setUp(self):
        self.diagnostics1 = DiagnosticsModel.objects.create(
            modality = 'Urinalysis (Analyzes urine for sings of infection and other conditions)'
        )

        self.diagnostics2 = DiagnosticsModel.objects.create(
            modality='CT Scan (Computed Tomography)'
        )
        
    def test_diagnostics_model(self):
        self.assertEqual(self.diagnostics1.modality,
                         'Urinalysis (Analyzes urine for sings of infection and other conditions)')
        self.assertEqual(self.diagnostics2.modality, 'CT Scan (Computed Tomography)')