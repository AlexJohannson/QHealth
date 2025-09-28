from django.contrib.auth import get_user_model
from django.db import models

from core.models import BaseModel

from apps.roles.models import RolesModels

UserModel = get_user_model()

class BookingDoctorModel(BaseModel):
    class Meta:
        db_table = 'booking_doctor'


    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='booking_doctor_user')
    doctors_specialty = models.ForeignKey(RolesModels, on_delete=models.CASCADE, related_name='booking_doctor_specialty')
    date_time = models.CharField(max_length=50)
