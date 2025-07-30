from django.contrib.auth import get_user_model
from django.db.transaction import atomic

from rest_framework import serializers

from core.services.email_service import EmailService

from apps.users.models import ProfileModel

UserModel = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileModel
        fields = (
            'id',
            'name',
            'surname',
            'phone_number',
            'age',
            'date_of_birth',
            'height',
            'weight',
            'street',
            'house',
            'city',
            'region',
            'country',
            'gender',
            'created_at',
            'updated_at',
        )

    def validate_age(self, value):
        if value <= 17:
            raise serializers.ValidationError('You must be are legal age to register on our platform.')
        return value


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = UserModel
        fields = (
            'id',
            'email',
            'password',
            'is_active',
            'is_staff',
            'is_superuser',
            'last_login',
            'created_at',
            'updated_at',
            'profile'
        )
        read_only_fields = (
            'id',
            'is_active',
            'is_staff',
            'is_superuser',
            'last_login',
            'created_at',
            'updated_at'
        )
        extra_kwargs = {
            'password': {
                'write_only': True,
            }
        }

    @atomic
    def create(self, validated_data:dict):
        profile = validated_data.pop('profile')
        user = UserModel.objects.create_user(**validated_data)
        ProfileModel.objects.create(user=user, **profile)
        EmailService.register(user)
        return user



    def update(self, instance, validated_data:dict):
        profile_data = validated_data.pop('profile', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance


    