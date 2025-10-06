from django.contrib.auth import get_user_model

from rest_framework import serializers

from apps.booking_doctor.models import BookingDoctorModel
from apps.roles.serializer import RolesReadSerializer
from apps.users.serializer import UserSerializer

UserModel = get_user_model()


class BookingDoctorSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(),
        source='user',
        write_only=True
    )

    user = UserSerializer(read_only=True)

    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.filter(role__role='doctor'),
        source='doctor',
        write_only=True
    )


    doctor = serializers.SerializerMethodField()


    class Meta:
        model = BookingDoctorModel
        fields = (
            'id',
            'user_id',
            'user',
            'doctor_id',
            'doctor',
            'date_time',
            'created_at',
            'updated_at',
        )
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }

    def get_doctor(self, obj):
        try:
            if hasattr(obj.doctor, 'role'):
                return RolesReadSerializer(obj.doctor.role).data
        except Exception as e:
            print(f"Error getting doctor role: {e}")
        return None

    def validate_doctor_id(self, value):
        try:
            if not hasattr(value, 'role') or value.role.role != 'doctor':
                raise serializers.ValidationError({
                    'Details' : 'The selected user is not a doctor.'
                })
        except Exception:
            raise serializers.ValidationError({
                'Details' : 'The selected user has no role assigned.'
            })
        return value

    def validate(self, attrs):
        user = attrs.get('user')
        doctor = attrs.get('doctor')

        if user == doctor:
            raise serializers.ValidationError({
                'Details' : 'You cannot book a vist to yourself!'
            })

        if BookingDoctorModel.objects.filter(user=user, doctor=doctor).exists():
            raise serializers.ValidationError({
                'Details' : 'Patient already have a reservation with this doctor!'
            })
        return attrs