from django.contrib.auth import get_user_model
from django.db import models

from core.models import BaseModel

from apps.diagnostics.models import DiagnosticsModel

UserModel = get_user_model()

class BookingDiagnosticModel(BaseModel):
    class Meta:
        db_table = 'booking_diagnostic'


    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='booking_diagnostic')
    diagnostic_service = models.ForeignKey(DiagnosticsModel, on_delete=models.CASCADE, related_name='booking_diagnostic_user')
    booked_by = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='booking_diagnostic_by')
    date_time = models.CharField(max_length=50, blank=True, null=True)
