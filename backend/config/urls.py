from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/recommendations/', include('apps.recommendations.urls')), 
      # Inclut les URLs de l'app recommendations
]
