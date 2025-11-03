from django.urls import path
from .views import user_register_view

urlpatterns =[
    path('users/', user_register_view, name = 'get_user'),
]