from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Expense

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password':{"write_only":True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('category', 'vendor', 'date', 'amount', 'expense_purpose','reported_by')
        extrakwargs = {"reported_by":{"read_only":True}}
