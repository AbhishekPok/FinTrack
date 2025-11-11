#imports from internal configs
from django.contrib import admin
from django.urls import path, include
#imports for swagger
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
#import for rest_framework
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenRefreshView
#import from written module
from loginfeature.views import *

# -------------COnfig Starts from Here-------------------------
# Swagger configs
schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny,],
)
# -------------URL pattern generation-------------------------
swaggerpatterns=[
    path('swagger.<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('loginfeature/', include('loginfeature.urls'))
]
adminpattern = [
    path('admin/', admin.site.urls),
]
registerpatterns = [
    path('loginfeature/user/register/', UserRegisterView.as_view(), name = 'register'),
    path('loginfeature/token/', TokenRefreshView.as_view(), name = 'get_token'),
    path('loginfeature/token/refresh/', TokenRefreshView.as_view(), name = 'refresh')
]
# -------------Calling URLS to a single list-------------------------
urlpatterns = [
    path('loginfeature/auth/', include('rest_framework.urls'))
    ] + swaggerpatterns + adminpattern + registerpatterns

