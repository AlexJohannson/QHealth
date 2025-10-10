from django.contrib.auth import get_user_model
from django.db import models

from core.models import BaseModel

from apps.roles.models import RolesModels

UserModel = get_user_model()

class BookingDoctorModel(BaseModel):
    class Meta:
        db_table = 'booking_doctor'

    STATUS_CHOICES = (
        ('booked', 'Booked'),
        ('cancelled', 'Cancelled'),
    )


    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='booking_doctor_user')
    doctor = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name='bookings_as_doctor',
        limit_choices_to={'role__role': 'doctor'}
    )
    date_time = models.DateTimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='booked')
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.is_active = self.status == 'booked'
        super().save(*args, **kwargs)
