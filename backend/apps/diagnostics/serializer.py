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
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def validate(self, attrs):
        modality = attrs.get('modality')
        if DiagnosticsModel.objects.filter(modality=modality).exists():
            raise serializers.ValidationError({
                'Modality':'This modality is already registered! Please, check the modality list.'
            })
        return attrs