# Default admin urls import
from django.contrib import admin
from django.urls import path, re_path, include
# urls import for swagger
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#swagger configs
schema_view = get_schema_view(
    openapi.Info(
        title="FinTrack API",
        default_version='v1',
        description="API documentation for FinTrack - Personal Finance Manager",
        terms_of_service="https://www.fintrack.com/terms/",
        contact=openapi.Contact(email="support@fintrack.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

#URL patterns setups
adminurlpatterns = [
    path("admin/", admin.site.urls),
]

swaggerurlpatterns = [
    path('swagger.<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

appurlpatterns = [

    path('accounts/', include('accounts.v1.urls')),
    path('transactions/', include('transactions.v1.urls') ),
    path('reports/', include('report.v1.urls')),
]

urlpatterns = [] + adminurlpatterns + swaggerurlpatterns + [
    path('api/v1/', include(appurlpatterns)),
]
