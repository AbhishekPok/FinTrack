from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=300)
    password = models.CharField(max_length=20)
    confirm_password = models.CharField(max_length=20, default='pythonuser')

    def __str__(self):
        return self.name, self.email, self.password, self.confirm_password, self.confirm_password
from django.db import models

# Create your models here.
