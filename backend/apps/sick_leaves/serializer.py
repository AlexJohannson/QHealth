from django.contrib.auth import get_user_model

from rest_framework import serializers

from core.services.cloudinary_service import get_file_url
from core.services.sick_leaves_service import create_sick_leave_pdf_and_upload

from apps.roles.models import RolesChoices
from apps.sick_leaves.models import SickLeavesModel
from apps.users.serializer import UserSerializer

UserModel = get_user_model()


class SickLeavesSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(),
        source="user",
        write_only=True,
    )

    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.filter(role__role="doctor"),
        source="doctor",
        write_only=True,
        required=False,
    )

    user = UserSerializer(read_only=True)
    doctor = UserSerializer(read_only=True)
    file_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SickLeavesModel
        fields = (
            "id",
            "user_id",
            "user",
            "doctor_id",
            "doctor",
            "diagnosis",
            "description",
            "from_date",
            "to_date",
            "file_url",
        )


    def create(self, validated_data):
        request = self.context["request"]
        creator = request.user

        is_doctor = (
                hasattr(creator, "role")
                and creator.role
                and creator.role.role == RolesChoices.DOCTOR
        )


        if not (is_doctor or creator.is_staff or creator.is_superuser):
            raise serializers.ValidationError(
                "You do not have permission to create sick leaves"
            )


        if is_doctor and not (creator.is_staff or creator.is_superuser):
            doctor = creator
        else:

            doctor = validated_data.get("doctor")
            if not doctor:
                raise serializers.ValidationError(
                    {"doctor_id": "This field is required"}
                )

        sick_leave = create_sick_leave_pdf_and_upload(
            user=validated_data["user"],
            doctor=doctor,
            diagnosis=validated_data["diagnosis"],
            description=validated_data["description"],
            from_date=validated_data["from_date"],
            to_date=validated_data["to_date"],
        )

        return sick_leave

    def get_file_url(self, obj):
        return get_file_url(obj.file_id)









