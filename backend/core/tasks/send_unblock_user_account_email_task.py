from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()
@app.task
def send_unblock_user_account_email_task(user_id):
    try:
        user = UserModel.objects.get(pk=user_id)
    except UserModel.DoesNotExist:
        return

    EmailService.send_email(
        to=user.email,
        template_name='unblock_user_account.html',
        context={
            'name': user.profile.name,
        },
        subject='Unblock User Account',
    )