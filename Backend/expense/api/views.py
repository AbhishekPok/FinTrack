# Import from django contrib
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

# Import from the restframework and permission classes
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

# Import from Internal Modules
from .serializers import UserRegisterSerializer, UserLoginSerializer, ExpenseSerializer
from .models import Expense


class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.get(reported_by=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(reported_by=self.request.user)
        else:
            print(serializer.errors)


class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(reported_by=user)


class UserRegisterView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]


class UserLoginView(APIView):
    permission_classes = [AllowAny]
    # serializer_class = UserLoginSerializer

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Validation
        if not email or not password:
            return Response(
                {'error': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Find user by email and authenticate
        try:
            user = User.objects.get(email=email)
            # Authenticate using username (since Django uses username by default)
            authenticated_user = authenticate(request, username=user.username, password=password)

            if authenticated_user is not None:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(authenticated_user)

                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'user': {
                        'id': authenticated_user.id,
                        'username': authenticated_user.username,
                        'email': authenticated_user.email,
                        'first_name': authenticated_user.first_name,
                        'last_name': authenticated_user.last_name
                    },
                    'message': 'Login successful'
                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Invalid email or password'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        except User.DoesNotExist:
            return Response(
                {'error': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )