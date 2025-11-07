from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()


@app.task
def send_delete_user_account_email_task(email, name):
    EmailService.send_email(
        to=email,
        template_name='deleted_account.html',
        context={
            'name': name
        },
        subject='Deleted Account',
    )


