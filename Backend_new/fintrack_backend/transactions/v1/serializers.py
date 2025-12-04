from rest_framework import serializers
from ..models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'id',
            'amount',
            'date',
            'merchant',
            'category',
            'type',
            'notes',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_amount(self, value):
        """Ensure amount is positive"""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_category(self, value):
        """Validate category exists in choices"""
        valid_categories = [choice[0] for choice in Transaction.CATEGORIES]
        if value not in valid_categories:
            raise serializers.ValidationError(f"Invalid category. Choose from: {', '.join(valid_categories)}")
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