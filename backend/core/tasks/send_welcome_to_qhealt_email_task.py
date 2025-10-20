from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()

@app.task
def send_welcome_to_qhealt_email(user_id):
    try:
        user = UserModel.objects.select_related('profile').get(id=user_id)
    except UserModel.DoesNotExist:
        return


    EmailService.send_email(
        to=user.email,
        template_name='welcome.html',
        context={
            'name': user.profile.name,
        },
        subject='Welcome'
    )