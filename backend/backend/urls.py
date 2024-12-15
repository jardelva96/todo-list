from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect
from rest_framework.routers import DefaultRouter  # CORREÇÃO: Importando DefaultRouter corretamente
from tasks.views import TaskViewSet, UserViewSet, CategoryViewSet, get_weather, UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from . import metrics
from rest_framework_simplejwt import views as jwt_views
from .metrics import *

# Criar o roteador para gerenciar as rotas principais
router = DefaultRouter()  # Inicializando o DefaultRouter corretamente
router.register(r'tasks', TaskViewSet, basename='task')  # Rotas para gerenciamento de tarefas
router.register(r'categories', CategoryViewSet, basename='category')  # Rotas para categorias

# Definição das URLs
urlpatterns = [
    # Redirecionamento padrão
    path('', lambda request: HttpResponseRedirect('/api/')),  # Redireciona para /api/

    # Painel Admin do Django
    path('admin/', admin.site.urls),

    # Rotas da API principal
    path('api/', include(router.urls)),

    # Rotas de autenticação
    path('api/auth/', include('rest_framework.urls')),  # Autenticação padrão do Django
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Obtenção de token JWT
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Atualização de token JWT

    # Registro de novos usuários
    path('api/users/register/', UserViewSet.as_view({'post': 'register'}), name='register_user'),

    # API externa: Clima
    path('api/weather/<str:city>/', get_weather, name='get_weather'),  # Rota para buscar o clima de uma cidade

    # Endpoint para usuário logado
    path('api/user/', UserProfileView.as_view(), name='user_profile'),  # Rota para obter dados do usuário logado
    
    path('metrics/', metrics, name='metrics'),
    # outras rotas
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),


]
