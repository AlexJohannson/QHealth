from rest_framework.permissions import BasePermission


class IsSuperUserOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff and request.user.is_superuser


class IsSuperUserOrAdminOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.user.is_superuser


from rest_framework.permissions import BasePermission


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


