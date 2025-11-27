from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
]