from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

from apps.booking_doctor.models import BookingDoctorModel

UserModel = get_user_model()
@app.task
def send_booking_doctor_email_task(booking_id):
    try:
        booking = BookingDoctorModel.objects.select_related(
            'user__profile',
            'doctor__profile',
            'doctor__role'
        ).get(id=booking_id)
    except BookingDoctorModel.DoesNotExist:
        return

    user = booking.user

    EmailService.send_email(
        to=user.email,
        template_name='booking_visit_doctor.html',
        context={
            'name': user.profile.name,
            'doctor_name': booking.doctor.profile.name,
            'doctor_surname': booking.doctor.profile.surname,
            'specialty': booking.doctor.role.specialty,
            'date_time': booking.date_time,
            'status': booking.status
        },
        subject='Booking Visit Doctor Email',

    )
