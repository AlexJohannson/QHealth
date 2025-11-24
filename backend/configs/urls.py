"""
URL configuration for configs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import include, path

from rest_framework.permissions import AllowAny

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="QHealth",
        default_version='v1',
        description="QHealth API",
        contact=openapi.Contact(email="qhealth@exampl.com"),
    ),
    public=True,
    permission_classes=[AllowAny],
)
urlpatterns = [
    path('api/users', include('apps.users.urls')),
    path('api/auth', include('apps.auth.urls')),
    path('api/security', include('apps.security.urls')),
    path('api/roles', include('apps.roles.urls')),
    path('api/patient_card', include('apps.patient_card.urls')),
    path('api/diagnostics', include('apps.diagnostics.urls')),
    path('api/booking_diagnostic', include('apps.booking_diagnostic.urls')),
    path('api/booking_doctor', include('apps.booking_doctor.urls')),
    path('api/patient_recipe', include('apps.patient_recipe.urls')),
    path('api/doc', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger'),

]
