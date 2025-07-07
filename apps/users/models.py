from django.db import models

from core.models import BaseModel


class UserModel(BaseModel):
    class Meta:
        db_table = 'users'

    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=30)
    age = models.IntegerField()
    date_of_birth = models.DateField()
    height = models.IntegerField()
    weight = models.IntegerField()
    street = models.CharField(max_length=40)
    house = models.IntegerField()
    city = models.CharField(max_length=30)
    region = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    gender = models.CharField(max_length=10)


