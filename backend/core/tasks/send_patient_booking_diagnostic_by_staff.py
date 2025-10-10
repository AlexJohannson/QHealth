from django.contrib.auth import get_user_model

from configs.celery import app
from core.services.email_service import EmailService

from apps.booking_diagnostic.models import BookingDiagnosticModel

UserModel = get_user_model()

@app.task
def send_patient_booking_diagnostic_by_staff(booking_id):
    try:
        booking = BookingDiagnosticModel.objects.select_related(
            'user', 'diagnostic_service', 'booked_by'
        ).get(id=booking_id)

        user = booking.user
        diagnostic_service = booking.diagnostic_service
        booked_by = booking.booked_by

        if hasattr(booked_by, 'role') and booked_by.role:
            booked_by_label = booked_by.role.role
        elif booked_by.is_superuser:
            booked_by_label = 'Superuser'
        elif booked_by.is_staff:
            booked_by_label = 'Admin'
        else:
            booked_by_label = 'Staff'

        EmailService.send_email(
            to=user.email,
            template_name='booking_diagnostic_by_staff.html',
            context={
                'name': user.profile.name,
                'diagnostic_service': diagnostic_service.modality,
                'date_time': booking.date_time,
                'booked_by': booked_by_label,
            },
            subject='Booking Diagnostic',
        )

    except Exception as e:
        print(f'Error sending email for booking {booking_id}: {str(e)}')
