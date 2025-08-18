from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()

@app.task
def send_create_role_email_task():
    users = UserModel.objects.filter(role__isnull=False)

    for user in users:
        EmailService.send_email(
            to=user.email,
            template_name='create_role.html',
            context={
                'name': user.profile.name,
                'role': user.role.role,
                'specialty': user.role.specialty,
            },
            subject= 'Create Role QHealth'
        )