from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()  # Utilise le modèle d'utilisateur personnalisé

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Créer un utilisateur avec un mot de passe sécurisé
        user = User.objects.create_user(**validated_data)
        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': False},  # facultatif ou obligatoire selon ton besoin
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user