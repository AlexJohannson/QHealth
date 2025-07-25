from datetime import date

from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()

@app.task
def happy_birthday():
    today = date.today()
    users = UserModel.objects.filter(is_superuser=False)

    for user in users:
        profile = getattr(user, 'profile', None)
        if not profile or not profile.date_of_birth:
            continue

        if profile.date_of_birth.day == today.day and profile.date_of_birth.month == today.month:
            EmailService.send_email.delay(
                to=user.email,
                template='birthday.html',
                context={
                    'name': user.profile.name,
                },
                subject='Happy Birthday',
            )