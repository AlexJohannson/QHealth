from rest_framework.permissions import BasePermission


class IsSuperUserOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.is_staff




class IsSuperUserOrRoleOwner(BasePermission):
    allowed_roles = ['doctor', 'pharmacist', 'operator']

    def has_permission(self, request, view):
        if request.method != 'GET':
            return False

        role_obj = getattr(request.user, 'role', None)
        role = getattr(role_obj, 'role', None)


        if request.user.is_superuser or request.user.is_staff or role == 'operator':
            return True

        return role_obj is not None and role in self.allowed_roles

    def has_object_permission(self, request, view, obj):
        if request.method != 'GET':
            return False

        role_obj = getattr(request.user, 'role', None)
        role = getattr(role_obj, 'role', None)

        if request.user.is_superuser or request.user.is_staff or role == 'operator':
            return True

        return obj.user == request.user and role in self.allowed_roles



# class IsSuperUserOrOperator(BasePermission):
#     allowed_roles = ['operator']
#
#     def has_permission(self, request, view):
#         if request.method == 'GET':
#             if request.user.is_superuser or request.user.is_staff:
#                 return True
#             return hasattr(request.user, 'role') and request.user.role and request.user.role.role in self.allowed_roles
#
#         return False
#
#     def has_object_permission(self, request, view, obj):
#         if request.method == 'GET':
#             if request.user.is_superuser or request.user.is_staff:
#                 return True
#             return obj.user == request.user and request.user.role.role in self.allowed_roles
#
#         return False


class IsSuperUserOrOperator(BasePermission):
    allowed_roles = ['operator']

    def has_permission(self, request, view):
        if request.method == 'GET':
            if request.user.is_superuser or request.user.is_staff:
                return True
            role_obj = getattr(request.user, 'role', None)
            return role_obj and role_obj.role in self.allowed_roles

        if request.method == 'POST':
            return request.user.is_superuser or request.user.is_staff

        return False



