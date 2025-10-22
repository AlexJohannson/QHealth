from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()
@app.task
def send_revoke_admin_email_task(user_id):
    try:
        user = UserModel.objects.get(pk=user_id)
    except UserModel.DoesNotExist:
        return

    EmailService.send_email(
        to=user.email,
        template_name='revoke_admin.html',
        context={
            'name': user.profile.name,
        },
        subject='Revoke Admin',
    )