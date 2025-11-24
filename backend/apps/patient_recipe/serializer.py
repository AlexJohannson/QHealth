from django.contrib.auth import get_user_model

from rest_framework import serializers

from core.tasks.send_patient_recipe_message_email_task import send_patient_recipe_message_email_task

from apps.patient_recipe.models import PatientRecipeModel
from apps.users.serializer import UserSerializer

UserModel = get_user_model()


class PatientRecipeSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(),
        source='user',
        write_only=True
    )
    user = UserSerializer(read_only=True)

    class Meta:
        model = PatientRecipeModel
        fields = (
            'id',
            'recipe',
            'description',
            'user_id',
            'user',
            'created_at',
            'updated_at',
        )
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }


    def create(self, validated_data):
        patient_recipe = super().create(validated_data)
        send_patient_recipe_message_email_task.delay(patient_recipe.id)
        return patient_recipe