from rest_framework.permissions import BasePermission


class IsSuperUserOrAdminOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_superuser



class IsSuperUserOrAdminOrUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user and (
                request.user.is_staff or
                request.user.is_superuser or
                request.user == obj
            )
        )

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


class IsSuperUserAdminOrRole(BasePermission):
    allowed_roles = ['doctor', 'pharmacist', 'operator']

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.is_superuser or request.user.is_staff:
                return True

            return hasattr(request.user, 'role') and request.user.role.role in self.allowed_roles
        return False



class IsSuperUserAdminOrRoleOrOwner(BasePermission):
    allowed_roles = ['doctor', 'pharmacist', 'operator']

    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.is_superuser or user.is_staff:
            return True


        if hasattr(user, 'role') and user.role.role in self.allowed_roles:
            return True

        return obj == user


