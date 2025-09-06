from django.db import models

from core.models import BaseModel


class DiagnosticsModel(BaseModel):
    class Meta:
        db_table = 'diagnostics'

    modality = models.CharField(max_length=100)
