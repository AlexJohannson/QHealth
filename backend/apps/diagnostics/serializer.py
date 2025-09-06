from rest_framework import serializers

from apps.diagnostics.models import DiagnosticsModel


class DiagnosticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticsModel
        fields = (
            'id',
            'modality',
            'created_at',
            'updated_at',
        )