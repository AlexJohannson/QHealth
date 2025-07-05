from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=30)
    surname = serializers.CharField(max_length=30)
    phone_number = serializers.CharField(max_length=30)
    age = serializers.IntegerField()
    date_of_birth = serializers.DateField()
    height = serializers.IntegerField()
    weight = serializers.IntegerField()
    street = serializers.CharField(max_length=40)
    house = serializers.IntegerField()
    city = serializers.CharField(max_length=30)
    region = serializers.CharField(max_length=30)
    country = serializers.CharField(max_length=30)
    gender = serializers.CharField(max_length=10)