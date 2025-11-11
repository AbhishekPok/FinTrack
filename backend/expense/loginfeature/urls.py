from django.urls import path
from .views import UserRegisterView

urlpatterns =[
    path('loginfeatures/', UserRegisterView.as_view(), name = 'get_user'),
]