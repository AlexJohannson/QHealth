from django.db import models

from core.models import BaseModel

from apps.users.models import UserModel


class PatientCardModel(BaseModel):
    class Meta:
        db_table = 'patient_card'

    diagnosis = models.CharField(max_length=100)
    description = models.TextField()
    planning = models.TextField()
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='patient_cards')
