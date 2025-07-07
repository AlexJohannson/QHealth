from rest_framework import serializers

from apps.users.models import UserModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
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
    