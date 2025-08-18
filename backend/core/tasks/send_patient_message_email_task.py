from configs.celery import app
from core.services.email_service import EmailService

from apps.patient_card.models import PatientCardModel


@app.task
def send_patient_message_email_task(patient_card_id: int):
    try:
        patient_card = PatientCardModel.objects.select_related("user__profile").get(id=patient_card_id)
    except PatientCardModel.DoesNotExist:
        return

    user = patient_card.user

    EmailService.send_email(
        to=user.email,
        template_name='send_patient_message.html',
        context={
            'name': user.profile.name,
        },
        subject='Patient Message',
    )
