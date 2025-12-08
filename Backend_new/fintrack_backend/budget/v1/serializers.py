from rest_framework import serializers
from ..models import Budget
from transactions.models import Category
from transactions.v1.serializers import CategorySerializer


class BudgetSerializer(serializers.ModelSerializer):
    """Serializer for Budget model"""
    category_detail = CategorySerializer(source='category', read_only=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.none(),
        required=True
    )
    spent_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    remaining_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    percentage_used = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Budget
        fields = [
            'id',
            'category',
            'category_detail',
            'amount',
            'period',
            'start_date',
            'end_date',
            'spent_amount',
            'remaining_amount',
            'percentage_used',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        user = self.context.get('request') and self.context['request'].user
        if user and user.is_authenticated:
            self.fields['category'].queryset = Category.objects.filter(user=user)

    def create(self, validated_data):
        """Automatically set user from request context"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def validate(self, data):
        """Validate that end_date is after start_date"""
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] <= data['start_date']:
                raise serializers.ValidationError("End date must be after start date")
        return data


class BudgetListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    category_detail = CategorySerializer(source='category', read_only=True)
    percentage_used = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Budget
        fields = [
            'id',
            'category_detail',
            'amount',
            'period',
            'percentage_used',
            'start_date',
            'end_date'
        ]
