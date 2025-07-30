from rest_framework import serializers

from apps.security.models import LoginAttempt


class SecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginAttempt
        fields = (
            'id',
            'email',
            'ip_address',
            'timestamp',
            'success',
            'created_at',
            'updated_at',
        )