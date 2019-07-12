from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken import views

from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token, name='api-token-auth')
]

urlpatterns += [
    path('', include('core.urls'))
]
