from django.contrib.auth import get_user_model

from rest_framework import serializers

from core.tasks.send_patient_message_email_task import send_patient_message_email_task

from apps.patient_card.models import PatientCardModel
from apps.users.serializer import UserSerializer

UserModel = get_user_model()

class PatientCardSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(),
        source='user',
        write_only=True
    )
    user = UserSerializer(read_only=True)

    class Meta:
        model = PatientCardModel
        fields = (
            'id',
            'diagnosis',
            'description',
            'planning',
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
        patient_card = super().create(validated_data)
        send_patient_message_email_task.delay(patient_card.id)
        return patient_card