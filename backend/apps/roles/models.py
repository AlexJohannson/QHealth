from django.db import models

from core.models import BaseModel

from apps.users.models import UserModel


class RolesChoices(models.TextChoices):
    DOCTOR = 'doctor', 'Doctor'
    PHARMACIST = 'pharmacist', 'Pharmacist'
    OPERATOR = 'operator', 'Call Center Operator'

class RolesModels(BaseModel):
    class Meta:
        db_table = 'roles'

    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='role')
    role = models.CharField(max_length=20, choices=RolesChoices.choices)
    specialty = models.CharField(max_length=50, blank=True, null=True)
    is_available_for_booking = models.BooleanField(default=True)



