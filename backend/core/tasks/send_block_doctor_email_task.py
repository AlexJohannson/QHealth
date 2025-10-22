from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

UserModel = get_user_model()

@app.task
def send_block_doctor_email_task(user_id):
    try:
        user = UserModel.objects.select_related('profile', 'role').get(id=user_id)
    except UserModel.DoesNotExist:
        return

    EmailService.send_email(
        to=user.email,
        template_name='block_doctor.html',
        context={
            'name': user.profile.name,
            'role': user.role.role,
            'specialty': user.role.specialty,
        },
        subject='Block Doctor QHealth'
    )