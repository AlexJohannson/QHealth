import json
import logging
import os

from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin

import redis

from apps.security.models import LoginAttempt

logger = logging.getLogger("security")

REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 1))

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

MAX_ATTEMPTS = 5
BAN_DURATION = 600


class LoginRateLimitMiddleware(MiddlewareMixin):

    def process_request(self, request):
        if request.path == "/api/auth" and request.method == "POST":

            email = request.POST.get("email") or request.POST.get("username")

            if not email:
                try:
                    data = json.loads(request.body.decode("utf-8"))
                    email = data.get("email") or data.get("username")
                except Exception:
                    email = None

            ip = self.get_client_ip(request)
            redis_key = f"failed_login:{ip}"

            try:
                if redis_client.exists(redis_key) and int(redis_client.get(redis_key)) >= MAX_ATTEMPTS:
                    logger.warning(f"[BLOCKED] Too many failed login attempts from IP {ip}")
                    return JsonResponse(
                        {"detail": "Too many failed login attempts. Try again in 10 minutes."},
                        status=429
                    )
            except redis.exceptions.ConnectionError:
                logger.warning("[REDIS UNAVAILABLE] Cannot check rate limit")

            request._login_email = email
            request._login_ip = ip

    def process_response(self, request, response):
        if (
            request.path == "/api/auth"
            and request.method == "POST"
            and hasattr(request, "_login_ip")
        ):
            email = getattr(request, "_login_email", None)
            ip = getattr(request, "_login_ip", None)
            key = f"failed_login:{ip}"

            try:
                if response.status_code == 200:
                    redis_client.delete(key)
                    LoginAttempt.objects.create(email=email, ip_address=ip, success=True)
                    logger.info(f"[SUCCESS] Login from {email} | IP: {ip}")
                else:
                    count = redis_client.incr(key)
                    if count == 1:
                        redis_client.expire(key, BAN_DURATION)

                    LoginAttempt.objects.create(email=email, ip_address=ip, success=False)
                    logger.warning(f"[FAILED] Login from {email} | IP: {ip} | Count: {count}")

            except redis.exceptions.ConnectionError:
                logger.warning("[REDIS UNAVAILABLE] Cannot update login attempt count")

        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]
        return request.META.get("REMOTE_ADDR")
