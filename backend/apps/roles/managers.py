from django.contrib.auth.models import UserManager as Manager


class RoleManager(Manager):
    def create_role(self, email=None, password=None, **extra_fields):
        if not email:
            raise ValueError('Role email is required')

        if not password:
            raise ValueError('Role password is required')

        email = self.normalize_email(email)
        roles = self.model(email=email, **extra_fields)
        roles.set_password(password)
        roles.save()
        return roles