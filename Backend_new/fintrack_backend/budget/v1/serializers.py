from rest_framework import serializers
from django.db.models import Sum
from decimal import Decimal
from ..models import Budget
from transactions.v1.serializers import CategorySerializer
from transactions.models import Transaction


class BudgetSerializer(serializers.ModelSerializer):
    """Serializer for Budget model with spending calculations"""
    category_detail = CategorySerializer(source='category', read_only=True)
    spent_amount = serializers.SerializerMethodField()
    remaining_amount = serializers.SerializerMethodField()
    percentage_used = serializers.SerializerMethodField()
    
    class Meta:
        model = Budget
        fields = [
            'id', 'category', 'category_detail', 'amount', 'period',
            'start_date', 'end_date', 'spent_amount', 'remaining_amount',
            'percentage_used', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_spent_amount(self, obj):
        """Calculate total spent in this budget's category during the budget period"""
        spent = Transaction.objects.filter(
            user=obj.user,
            category=obj.category,
            type='expense',
            date__gte=obj.start_date,
            date__lte=obj.end_date
        ).aggregate(total=Sum('amount'))['total']
        
        return float(spent or Decimal('0.00'))
    
    def get_remaining_amount(self, obj):
        """Calculate remaining budget amount"""
        spent = self.get_spent_amount(obj)
        remaining = float(obj.amount) - spent
        return max(0, remaining)  # Don't show negative remaining
    
    def get_percentage_used(self, obj):
        """Calculate percentage of budget used"""
        spent = self.get_spent_amount(obj)
        if float(obj.amount) == 0:
            return 0
        percentage = (spent / float(obj.amount)) * 100
        return round(percentage, 2)


class BudgetListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list view with spending calculations"""
    category_detail = CategorySerializer(source='category', read_only=True)
    spent_amount = serializers.SerializerMethodField()
    remaining_amount = serializers.SerializerMethodField()
    percentage_used = serializers.SerializerMethodField()
    
    class Meta:
        model = Budget
        fields = [
            'id', 'category', 'category_detail', 'amount', 'period',
            'start_date', 'end_date', 'spent_amount', 'remaining_amount',
            'percentage_used'
        ]
    
    def get_spent_amount(self, obj):
        """Calculate total spent in this budget's category during the budget period"""
        spent = Transaction.objects.filter(
            user=obj.user,
            category=obj.category,
            type='expense',
            date__gte=obj.start_date,
            date__lte=obj.end_date
        ).aggregate(total=Sum('amount'))['total']
        
        return float(spent or Decimal('0.00'))
    
    def get_remaining_amount(self, obj):
        """Calculate remaining budget amount"""
        spent = self.get_spent_amount(obj)
        remaining = float(obj.amount) - spent
        return max(0, remaining)
    
    def get_percentage_used(self, obj):
        """Calculate percentage of budget used"""
        spent = self.get_spent_amount(obj)
        if float(obj.amount) == 0:
            return 0
        percentage = (spent / float(obj.amount)) * 100
        return round(percentage, 2)

