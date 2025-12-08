from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet
from .category_views import CategoryListCreateView, CategoryDetailView

# Create router and register viewsets
router = DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    # Category endpoints
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    # Transaction endpoints
    path('', include(router.urls)),
]