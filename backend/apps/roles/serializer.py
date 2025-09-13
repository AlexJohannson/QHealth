from django.contrib.auth import get_user_model

from rest_framework import serializers

from core.tasks.send_create_role_email_task import send_create_role_email_task

from apps.roles.models import RolesModels
from apps.users.serializer import UserSerializer

UserModel = get_user_model()
class RolesReadSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = RolesModels
        fields = (
            'id',
            'role',
            'specialty',
            'user'
        )


class RolesWriteSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = RolesModels
        fields = (
            'id',
            'role',
            'specialty',
            'user',
            'created_at',
            'updated_at',
        )
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def validate(self, data):
        role = data.get('role')
        specialty = data.get('specialty')

        if role == 'doctor' and not specialty:
            raise serializers.ValidationError({
                'specialty': 'This field is required for doctors.'
            })

        if role != 'doctor' and specialty:
            raise serializers.ValidationError({
                'specialty': 'Specialty is only allowed for doctors.'
            })

        return data

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        user.save()
        send_create_role_email_task.delay()
        return RolesModels.objects.create(user=user, **validated_data)





