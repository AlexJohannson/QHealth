from configs.celery import app
from core.services.email_service import EmailService

from apps.patient_card.models import PatientCardModel


@app.task
def send_patient_recipe_message_email_task(patient_recipe_id: int):
    try:
        patient_recipe = PatientCardModel.objects.select_related("user__profile").get(id=patient_recipe_id)
    except PatientCardModel.DoesNotExist:
        return

    user = patient_recipe.user

    EmailService.send_email(
        to=user.email,
        template_name='send_patient_recipe_message.html',
        context={
            'name': user.profile.name,
        },
        subject='Patient Recipe Message',
    )