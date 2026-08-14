import os

from django.core.mail import EmailMultiAlternatives
from email.mime.image import MIMEImage

from django.template.loader import get_template
from django.conf import settings
from configs.celery import app
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, VerifyEmailToken


class EmailService:
    @staticmethod
    @app.task
    def send_email(to:str, template_name:str, context:dict, subject:str)->None:
        template = get_template(template_name)
        html_content = template.render(context)
        msg = EmailMultiAlternatives(
            to = [to],
            from_email = os.environ.get('EMAIL_HOST_USER'),
            subject = subject,
        )
        msg.attach_alternative(html_content, "text/html")
        logo_path = os.path.join(settings.BASE_DIR, "static", "logo_pdf.png")

        with open(logo_path, "rb") as f:
            logo = MIMEImage(f.read())
            logo.add_header("Content-ID", "<logo_image>")
            logo.add_header("Content-Disposition", "inline", filename="logo_pdf.png")
            msg.attach(logo)

        msg.send()


    @classmethod
    def register(cls, user):
        token = JWTService.create_token(user, ActivateToken)
        url = f'http://localhost/auth/activate/{token}'
        cls.send_email.delay(
            to=user.email,
            template_name='activate.html',
            context={
                'name': user.profile.name,
                'url': url,
            },
            subject='Activate your account',
        )

    @classmethod
    def recovery(cls, user):
        token = JWTService.create_token(user, RecoveryToken)
        url = f'http://localhost/auth/recovery_password/{token}'
        cls.send_email.delay(
            to=user.email,
            template_name='recovery.html',
            context={
                'name': user.profile.name,
                'url': url,
            },
            subject='Recovery your password',
        )

    @classmethod
    def verify_email(cls, user):
        token = JWTService.create_token(user, VerifyEmailToken)
        url = f'http://localhost/users/verify_email/{token}'
        cls.send_email.delay(
            to=user.pending_email,
            template_name='verify_email.html',
            context={
                'name': user.profile.name,
                'url': url,
            },
            subject='Verify your email',
        )


