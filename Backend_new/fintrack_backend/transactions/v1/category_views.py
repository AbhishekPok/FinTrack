from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Category
from .serializers import CategorySerializer, CategoryDetailSerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    """
    GET: List all categories for the authenticated user
    POST: Create a new category
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a specific category
    PUT/PATCH: Update a category
    DELETE: Delete a category
    """
    permission_classes = [IsAuthenticated]
    serializer_class = CategoryDetailSerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
