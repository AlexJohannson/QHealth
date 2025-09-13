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

urlpatterns = [
    path('users', include('apps.users.urls')),
    path('auth', include('apps.auth.urls')),
    path('security', include('apps.security.urls')),
    path('roles', include('apps.roles.urls')),
    path('patient_card', include('apps.patient_card.urls')),
    path('diagnostics', include('apps.diagnostics.urls')),
    path('booking_diagnostic', include('apps.booking_diagnostic.urls')),

]
