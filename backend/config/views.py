from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
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
    from django.shortcuts import render

    return render(request, 'index.html')

