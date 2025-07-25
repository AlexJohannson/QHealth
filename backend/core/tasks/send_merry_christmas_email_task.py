from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()
@app.task
def merry_christmas_email():
    for user in UserModel.objects.filter(is_superuser=False):
        if not hasattr(user, 'profile'):
            continue
        EmailService.send_email.delay(
            to=user.email,
            template_name='merry_christmas.html',
            context={
                'name': user.profile.name,
            },
            subject= 'Merry Christmas',
        )