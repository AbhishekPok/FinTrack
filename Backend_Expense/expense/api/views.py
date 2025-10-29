from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegisterSerializer
from .models import User


@api_view(['GET'])
def user_register_view(request):
    return Response(UserRegisterSerializer({"username":"Abhishek","email":"abhishek@gmail.com","password":"abhishek@123#"}).data)

