from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from decimal import Decimal


class Category(models.Model):
    CATEGORY_TYPES = [
        ('expense', 'Expense'),
        ('income', 'Income'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=CATEGORY_TYPES)
    icon = models.CharField(max_length=50, default='tag')
    color = models.CharField(max_length=7, default='#3b82f6')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Categories'
        unique_together = ['user', 'name', 'type']
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.type})"


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='budgets')
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    month = models.IntegerField()  # 1-12
    year = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'category', 'month', 'year']
        ordering = ['-year', '-month']

    def __str__(self):
        return f"{self.user.username} - {self.category.name} - {self.month}/{self.year}"


class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='incomes')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='incomes')
    source = models.CharField(max_length=200)
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    date = models.DateField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.source} - ${self.amount}"


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='expenses')
    vendor = models.CharField(max_length=200)
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    date = models.DateField()
    expense_purpose = models.TextField(blank=True, null=True)
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reported_expenses')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.vendor} - ${self.amount}"


class SavingsGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='savings_goals')
    name = models.CharField(max_length=200)
    target_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    current_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=Decimal('0.00'),
        validators=[MinValueValidator(Decimal('0.00'))]
    )
    target_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_active', '-created_at']

    def __str__(self):
        return f"{self.name} - ${self.current_amount}/${self.target_amount}"

    @property
    def progress_percentage(self):
        if self.target_amount > 0:
            return (self.current_amount / self.target_amount) * 100
        return 0