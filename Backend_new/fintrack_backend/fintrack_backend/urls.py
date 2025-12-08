from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('accounts.v1.urls')),
    path('api/v1/', include('transactions.v1.urls')),
    path('api/v1/', include('budget.v1.urls')),
    path('api/v1/reports/', include('report.v1.urls')),
]
