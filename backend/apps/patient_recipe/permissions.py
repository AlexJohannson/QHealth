from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsSuperUserAdminPharmacistOrPatient(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            if request.user.is_superuser or request.user.is_staff:
                return True

            if hasattr(request.user, "role") and request.user.role.role == "pharmacist":
                return True

            return True


        if request.method == "POST":
            return (
                request.user.is_superuser
                or request.user.is_staff
                or (hasattr(request.user, "role") and request.user.role.role == "pharmacist")
            )


        if request.method == "DELETE":
            return request.user.is_superuser or request.user.is_staff

        return False



    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            if request.user.is_superuser or request.user.is_staff:
                return True

            role = getattr(request.user, "role", None)
            if role and role.role in ["pharmacist", "operator", "doctor"]:
                return True

            return obj.user == request.user

        if request.method == "DELETE":
            return request.user.is_superuser or request.user.is_staff

        return False