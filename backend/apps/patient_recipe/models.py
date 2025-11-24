from django.db import models

from core.models import BaseModel

from apps.users.models import UserModel


class PatientRecipeModel(BaseModel):
    class Meta:
        db_table = 'patient_recipe'

    recipe = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='patient_recipe')
