from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer

class RegisterView(APIView):
    def post(self, request):
        # Sérialisation des données d'inscription
        serializer = RegisterSerializer(data=request.data)
        
        if serializer.is_valid():  # Vérification que les données sont valides
            serializer.save()  # Enregistrer l'utilisateur
            return Response({'detail': 'Utilisateur créé avec succès.'}, status=status.HTTP_201_CREATED)
        
        # Afficher les erreurs dans la console
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Authentifier l'utilisateur
        user = authenticate(username=username, password=password)
        if user:
            # Créer un token JWT pour l'utilisateur
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Identifiants invalides"}, status=status.HTTP_401_UNAUTHORIZED)
