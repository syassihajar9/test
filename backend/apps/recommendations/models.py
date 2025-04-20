from django.db import models
from django.contrib.auth.models import User  # Si tu veux lier les recommandations à un utilisateur

class Recommendation(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création automatique
    updated_at = models.DateTimeField(auto_now=True)  # Date de mise à jour automatique
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Lier à un utilisateur, optionnel

    def __str__(self):
        return self.title
