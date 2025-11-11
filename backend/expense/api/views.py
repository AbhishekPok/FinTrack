#Import from django contrib
from django.contrib.auth.models import User
#Import from the restframework and permission classes
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
#Import from Internal Modules
from .serializers import UserRegisterSerializer, ExpenseSerializer
from .models import Expense

class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(reported_by=user)

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


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]



