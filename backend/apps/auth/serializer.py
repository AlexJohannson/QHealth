from django.contrib.auth import get_user_model
from django.core import validators as V

from rest_framework import serializers

from core.enums.regex_enum import RegexEnum

UserModel = get_user_model()

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        validators=[V.RegexValidator(RegexEnum.PASSWORD.pattern, RegexEnum.PASSWORD.msg)]
    )

    class Meta:
        model = UserModel
        fields = ['password']


class UserRoleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    is_superuser = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_user = serializers.BooleanField()
    role = serializers.CharField(allow_null=True)
    role_id = serializers.IntegerField(allow_null=True)
    specialty = serializers.CharField(allow_null=True)