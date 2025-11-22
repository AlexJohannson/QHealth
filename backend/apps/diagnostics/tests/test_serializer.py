from django.test import TestCase

from apps.diagnostics.models import DiagnosticsModel
from apps.diagnostics.serializer import DiagnosticsSerializer


class DiagnosticsTestSerializer(TestCase):
    def setUp(self):
        self.diagnostics1 = DiagnosticsModel.objects.create(
            modality='MRI (Magnetic Resonance Imaging)'
        )

        self.diagnostics2 = DiagnosticsModel.objects.create(
            modality='CT Scan (Computed Tomography)'
        )

    def test_diagnostics_serializer_serializer_valid_data_save(self):
        data={
            'modality': 'Diagnostics Valid Data'
        }
        serializer = DiagnosticsSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()

    def test_diagnostics_serializer_invalid_data(self):
        data={
            'modality': ''
        }
        serializer = DiagnosticsSerializer(data=data)
        self.assertFalse(serializer.is_valid(), serializer.errors)

    def test_validate_diagnostics_serializer(self):
        data={
            'modality': 'Diagnostics Valid Data'
        }
        serializer = DiagnosticsSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
