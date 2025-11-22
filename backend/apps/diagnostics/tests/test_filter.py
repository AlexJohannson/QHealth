from django.test import TestCase

from apps.diagnostics.filter import DiagnosticsFilter
from apps.diagnostics.models import DiagnosticsModel


class DiagnosticsTestFilter(TestCase):
    def setUp(self):
        self.diagnostics1 = DiagnosticsModel.objects.create(
            modality='MRI (Magnetic Resonance Imaging)'
        )

        self.diagnostics2 = DiagnosticsModel.objects.create(
            modality='CT Scan (Computed Tomography)'
        )

    def test_diagnostics_modality_filter(self):
        queryset = DiagnosticsModel.objects.all()
        filtered = DiagnosticsFilter({'modality': 'MRI (Magnetic Resonance Imaging)'}, queryset=queryset).qs
        self.assertIn(self.diagnostics1, filtered)
        self.assertNotIn(self.diagnostics2, filtered)

    def test_diagnostics_order_filter(self):
        queryset = DiagnosticsModel.objects.all()
        filtered = DiagnosticsFilter({'order': '-id'}, queryset=queryset).qs
        self.assertEqual(list(filtered), [self.diagnostics2, self.diagnostics1])