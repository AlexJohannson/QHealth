from rest_framework.permissions import BasePermission


class IsSuperUserOrAdminOrOperatorOrDoctor(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.is_staff:
            return True

        role = getattr(request.user, 'role', None)
        return role and role.role in ['operator', 'doctor']


class IsSuperUserOrAdminOrOperator(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.is_staff:
            return True

        role = getattr(request.user, 'role', None)
        return role and role.role == 'operator'



class IsSuperUserOrAdminOrDoctorOrOperatorOrPatient(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True

        role = getattr(request.user, 'role', None)
        if role and role.role in ['operator', 'doctor']:
            return True

        return obj.user == request.user



class IsSuperUserOrAdminOrPatientOrOperator(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser or request.user.is_staff:
            return True

        role = getattr(request.user, 'role', None)
        if role and role.role in ['operator']:
            return True

        if request.method in ['POST']:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or request.user.is_staff:
            return True

        role = getattr(request.user, 'role', None)
        if role and role.role in ['operator']:
            return True

        return obj.user == request.user




