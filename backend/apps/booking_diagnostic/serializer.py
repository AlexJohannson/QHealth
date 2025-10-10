from django.contrib.auth import get_user_model

from rest_framework import serializers

from apps.booking_diagnostic.models import BookingDiagnosticModel
from apps.diagnostics.models import DiagnosticsModel
from apps.diagnostics.serializer import DiagnosticsSerializer
from apps.users.serializer import UserSerializer

UserModel = get_user_model()



class BookingDiagnosticSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(),
        source='user',
        write_only=True
    )
    user = UserSerializer(read_only=True)

    diagnostics_id = serializers.PrimaryKeyRelatedField(
       queryset=DiagnosticsModel.objects.all(),
       source='diagnostic_service',
       write_only=True
    )
    diagnostic_service = DiagnosticsSerializer(read_only=True)

    booked_by_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(),
        source='booked_by',
        write_only=True
    )
    booked_by = UserSerializer(read_only=True)

    date_time = serializers.DateTimeField(required=False)

    class Meta:
        model = BookingDiagnosticModel
        fields = (
            'id',
            'user_id',
            'user',
            'diagnostics_id',
            'diagnostic_service',
            'booked_by_id',
            'booked_by',
            'date_time',
            'created_at',
            'updated_at',
        )
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
            'date_time': {'required': False},
        }



    def validate(self, attrs):
        request = self.context.get('request')
        user = getattr(request, 'user', None) if request else None
        date_time = attrs.get('date_time')
        target_user = attrs.get('user')

        if not user:
            raise serializers.ValidationError("Authentication required.")


        if target_user and target_user != user:
            role = getattr(user, 'role', None)
            can_book_for_others = (
                    user.is_superuser or
                    user.is_staff or
                    (role and role.role == 'operator')
            )

            if not can_book_for_others:
                raise serializers.ValidationError({
                    "Details": "You can only book appointments for yourself."
                })


        has_admin_rights = (
                user.is_superuser or
                user.is_staff or
                (getattr(user, 'role', None) and user.role.role == 'operator')
        )

        if has_admin_rights:
            if not date_time:
                raise serializers.ValidationError({
                    "date_time": "This field is required for operators/admins/superusers."
                })
        else:
            if date_time:
                raise serializers.ValidationError({
                    "date_time": "You are not allowed to set this field."
                })

        return attrs