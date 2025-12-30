from django.db import models

from core.models import BaseModel

from apps.users.models import UserModel


class SickLeavesModel(BaseModel):
    class Meta:
        db_table = 'sick_leaves'

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='sick_leaves')
    doctor = models.ForeignKey(UserModel, on_delete=models.PROTECT, related_name="issued_sick_leaves")
    diagnosis = models.CharField(max_length=50)
    description = models.TextField()
    from_date = models.DateField()
    to_date = models.DateField()

    file_name = models.CharField(max_length=255)
    file_id = models.CharField(max_length=255, unique=True)
    file_url_hash = models.CharField(max_length=255, unique=True)
