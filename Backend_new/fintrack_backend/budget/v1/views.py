from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Budget
from .serializers import BudgetSerializer, BudgetListSerializer


class BudgetListCreateView(generics.ListCreateAPIView):
    """
    GET: List all budgets for the authenticated user
    POST: Create a new budget
    """
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return BudgetListSerializer
        return BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user).select_related('category')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a specific budget
    PUT/PATCH: Update a budget
    DELETE: Delete a budget
    """
    permission_classes = [IsAuthenticated]
    serializer_class = BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user).select_related('category')
