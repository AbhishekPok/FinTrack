from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User
    permission_classes = [AllowAny]

