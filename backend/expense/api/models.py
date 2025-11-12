from django.db import models
from django.contrib.auth.models import User

class Expense(models.Model):
    category = models.CharField(max_length=200)
    vendor = models.CharField(max_length= 100)
    date = models.DateTimeField(auto_now_add = True)
    amount = models.IntegerField()
    expense_purpose = models.TextField()
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expense" )

    def __str__(self):
        return self.category

