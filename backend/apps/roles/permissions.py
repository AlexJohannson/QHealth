from rest_framework.permissions import BasePermission


class IsSuperUserOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.is_staff




class IsSuperUserOrRoleOwner(BasePermission):
    allowed_roles = ['doctor', 'pharmacist', 'operator']

    def has_permission(self, request, view):
        if request.method == 'GET':
            if request.user.is_superuser or request.user.is_staff:
                return True
            return hasattr(request.user, 'role') and request.user.role and request.user.role.role in self.allowed_roles


        if request.method == 'DELETE':
            return request.user.is_superuser or request.user.is_staff

        return False

    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            if request.user.is_superuser or request.user.is_staff:
                return True
            return obj.user == request.user and request.user.role.role in self.allowed_roles

        if request.method == 'DELETE':
            return request.user.is_superuser or request.user.is_staff

        return False

