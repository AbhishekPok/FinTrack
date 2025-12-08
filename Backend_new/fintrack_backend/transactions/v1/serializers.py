from rest_framework import serializers
from ..models import Transaction, Category


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category model"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'type', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        """Automatically set user from request context"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CategoryDetailSerializer(serializers.ModelSerializer):
    """Detailed category serializer with transaction count"""
    transaction_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon', 'type', 'transaction_count', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_transaction_count(self, obj):
        return obj.transactions.count()


class TransactionSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.none(),
        required=True
    )
    
    class Meta:
        model = Transaction
        fields = [
            'id',
            'amount',
            'date',
            'merchant',
            'category',
            'category_detail',
            'type',
            'notes',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        user = self.context.get('request')and self.context['request'].user
        if user and user.is_authenticated:
            self.fields['category'].queryset = Category.objects.filter(user=user)

    def validate_amount(self, value):
        """Ensure amount is positive"""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_type(self, value):
        """Validate transaction type"""
        valid_types = [choice[0] for choice in Transaction.TRANSACTION_TYPES]
        if value not in valid_types:
            raise serializers.ValidationError(f"Invalid type. Choose from: {', '.join(valid_types)}")
        return value


class TransactionListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""

    class Meta:
        model = Transaction
        fields = [
            'id',
            'amount',
            'date',
            'merchant',
            'category',
            'type',
            'notes'
        ]


class TransactionStatsSerializer(serializers.Serializer):
    """Serializer for transaction statistics"""
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_expenses = serializers.DecimalField(max_digits=10, decimal_places=2)
    balance = serializers.DecimalField(max_digits=10, decimal_places=2)
    transaction_count = serializers.IntegerField()
    category_breakdown = serializers.DictField()