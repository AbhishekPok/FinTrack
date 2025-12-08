from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from decimal import Decimal


class Category(models.Model):
    """User-specific transaction categories"""
    CATEGORY_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='categories'
    )
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, default='📁')  # Emoji or icon identifier
    type = models.CharField(max_length=10, choices=CATEGORY_TYPES, default='expense')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name']
        unique_together = ['user', 'name']
        verbose_name_plural = 'Categories'
        indexes = [
            models.Index(fields=['user', 'type']),
        ]
    
    def __str__(self):
        return f"{self.icon} {self.name}"


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    date = models.DateField()
    merchant = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category,
        on_delete=models.RESTRICT,
        related_name='transactions',
        null=True,
        blank=True
    )
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-created_at']
        indexes = [
            models.Index(fields=['user', 'date']),
            models.Index(fields=['user', 'category']),
            models.Index(fields=['user', 'type']),
        ]

    def __str__(self):
        return f"{self.merchant} - रु{self.amount} ({self.date})"