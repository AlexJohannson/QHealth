from django.db import models

from core.models import BaseModel


class LoginAttempt(BaseModel):
    email = models.EmailField(null=True, blank=True)
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField()