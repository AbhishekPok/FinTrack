from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Expense


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    name = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirm_password', 'name')
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate(self, data):
        # Check if passwords match
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match"})

        # Check if email already exists
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({"email": "User with this email already exists"})

        return data

    def create(self, validated_data):
        # Remove confirm_password from validated_data
        validated_data.pop('confirm_password')

        # Extract name and split into first_name and last_name
        name = validated_data.pop('name', '')
        name_parts = name.split(' ', 1)
        first_name = name_parts[0] if name_parts else ''
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        # Use email as username if username not provided
        if 'username' not in validated_data or not validated_data['username']:
            validated_data['username'] = validated_data['email']

        # Create user with hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data.get('username')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Email and password are required")

        return data


class ExpenseSerializer(serializers.ModelSerializer):
    reported_by_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Expense
        fields = ('id', 'category', 'vendor', 'date', 'amount', 'expense_purpose', 'reported_by', 'reported_by_name')
        extra_kwargs = {
            'reported_by': {'read_only': True}
        }

    def get_reported_by_name(self, obj):
        """Return the name of the user who reported the expense"""
        if obj.reported_by:
            return obj.reported_by.get_full_name() or obj.reported_by.username
        return None