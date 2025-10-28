from django.contrib.auth import get_user_model

from rest_framework import serializers

UserModel = get_user_model()

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['password']


class UserRoleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    is_superuser = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_user = serializers.BooleanField()
    role = serializers.CharField(allow_null=True)
    specialty = serializers.CharField(allow_null=True)