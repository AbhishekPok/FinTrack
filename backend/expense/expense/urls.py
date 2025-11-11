#imports from internal configs
from django.contrib import admin
from django.urls import path, include
#imports for swagger
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
#import for rest_framework
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
#import from written module
from api.views import *

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
    path('api/', include('api.urls'))
]
adminpattern = [
    path('admin/', admin.site.urls),
]
registerpatterns = [
    path('api/user/register/', UserRegisterView.as_view(), name = 'register'),
    path('api/token/', TokenObtainPairView.as_view(), name = 'get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name = 'refresh')
]
createanddeletepatterns = [
    path('api/', include("api.urls")),
]
# -------------Calling URLS to a single list-------------------------
urlpatterns = [
    path('api/auth/', include('rest_framework.urls'))
    ] + swaggerpatterns + adminpattern + registerpatterns + createanddeletepatterns

