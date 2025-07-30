import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configs.settings')

app = Celery('QHealth')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'send_happy_new_year_task': {
        'task':'core.tasks.send_happy_new_year_task.happy_new_year',
        'schedule': crontab(minute=00, hour=10, day_of_month=31, month_of_year=12)
    },
    'send_merry_christmas_task': {
        'task': 'core.tasks.send_merry_christmas_email_task.merry_christmas_email',
        'schedule': crontab(minute=00, hour=10, day_of_month=24, month_of_year=12)
    },
    'send_birthday_greeting': {
        'task': 'core.tasks.send_birthday_email_task.happy_birthday',
        'schedule': crontab(minute=00, hour=10)
    }
}
