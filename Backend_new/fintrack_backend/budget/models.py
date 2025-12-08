from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator
from decimal import Decimal
from transactions.models import Category


class Budget(models.Model):
    """User budgets for specific categories"""
    PERIOD_CHOICES = [
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
        ('yearly', 'Yearly'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='budgets'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='budgets'
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    period = models.CharField(max_length=10, choices=PERIOD_CHOICES, default='monthly')
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['user', 'category', 'start_date', 'end_date']
        indexes = [
            models.Index(fields=['user', 'period']),
            models.Index(fields=['user', 'start_date', 'end_date']),
        ]
    
    def __str__(self):
        return f"{self.category.name} - रु{self.amount} ({self.period})"
    
    @property
    def spent_amount(self):
        """Calculate total spent in this budget period"""
        from transactions.models import Transaction
        total = Transaction.objects.filter(
            user=self.user,
            category=self.category,
            date__gte=self.start_date,
            date__lte=self.end_date,
            type='expense'
        ).aggregate(models.Sum('amount'))['amount__sum'] or Decimal('0.00')
        return total
    
    @property
    def remaining_amount(self):
        """Calculate remaining budget"""
        return self.amount - self.spent_amount
    
    @property
    def percentage_used(self):
        """Calculate percentage of budget used"""
        if self.amount == 0:
            return 0
        return (self.spent_amount / self.amount) * 100
