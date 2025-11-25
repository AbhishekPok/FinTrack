from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomRegistrationSerializer, UserSerializer
from ..models import User


class RegisterUserView(generics.GenericAPIView):
    """
    GET: List all users
    POST: Register a new user + return JWT
    """
    serializer_class = CustomRegistrationSerializer
    queryset = User.objects.all()  # <--- Required for GenericAPIView

    def get(self, request):
        users = self.get_queryset()  # use queryset
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)  # uses serializer_class
        if serializer.is_valid():
            user = serializer.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
