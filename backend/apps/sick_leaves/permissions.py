from rest_framework.permissions import BasePermission

from apps.roles.models import RolesChoices


class SickLeavePermission(BasePermission):

    def has_permission(self, request, view):
        user = request.user

        if request.method == "POST":
            return (
                user.is_superuser
                or user.is_staff
                or (hasattr(user, "role") and user.role.role == RolesChoices.DOCTOR)
            )


        if request.method in ("GET",):
            return True


        if request.method == "DELETE":
            return user.is_superuser or user.is_staff

        return False

    def has_object_permission(self, request, view, obj):
        user = request.user


        if user.is_superuser or user.is_staff:
            return True


        if hasattr(user, "role") and user.role:
            return True


        if request.method == "GET":
            return obj.user_id == user.id


        return False