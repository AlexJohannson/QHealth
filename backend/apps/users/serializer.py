from datetime import date

from django.contrib.auth import get_user_model
from django.core import validators as V
from django.db.transaction import atomic

from rest_framework import serializers

from core.enums.regex_enum import RegexEnum
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

    def validate_date_of_birth(self, value):
        today = date.today()
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 18:
            raise serializers.ValidationError('You must be at least 18 years old to register.')
        return value

    def validate_height(self, value):
        if value <= 0:
            raise serializers.ValidationError('Height must be greater than zero.')
        return value

    def validate_weight(self, value):
        if value < 0:
            raise serializers.ValidationError('Weight must be greater than zero.')
        return value



class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    password = serializers.CharField(
        write_only=True,
        validators=[V.RegexValidator(RegexEnum.PASSWORD.pattern, RegexEnum.PASSWORD.msg)]
    )

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


    