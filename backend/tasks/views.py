from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from django.contrib.auth.models import User
from .models import Task, Category
from .serializers import TaskSerializer, UserSerializer, CategorySerializer
import requests
from django.conf import settings
from rest_framework.views import APIView


# ViewSet para gerenciar tarefas
class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar tarefas dos usuários.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna tarefas do usuário autenticado ou compartilhadas com ele.
        """
        return self.queryset.filter(user=self.request.user) | self.queryset.filter(shared_with=self.request.user)

    def perform_create(self, serializer):
        """
        Cria uma tarefa associada ao usuário autenticado.
        """
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], url_path='share')
    def share_task(self, request, pk=None):
        """
        Compartilha uma tarefa com outros usuários.
        """
        try:
            task = self.get_object()
            shared_users_ids = request.data.get('shared_with', [])
            shared_users = User.objects.filter(id__in=shared_users_ids)
            task.shared_with.add(*shared_users)
            return Response({'message': 'Tarefa compartilhada com sucesso!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='filter')
    def filter_tasks(self, request):
        """
        Filtra tarefas com base no status (concluídas ou pendentes).
        """
        status_filter = request.query_params.get('is_completed')
        if status_filter is not None:
            is_completed = status_filter.lower() == 'true'
            tasks = self.queryset.filter(user=request.user, is_completed=is_completed)
            serializer = self.get_serializer(tasks, many=True)
            return Response(serializer.data)
        return Response({'error': 'Parâmetro is_completed é obrigatório.'}, status=status.HTTP_400_BAD_REQUEST)


# ViewSet para gerenciar categorias
class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar categorias.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna categorias do usuário autenticado.
        """
        return self.queryset

    def perform_create(self, serializer):
        """
        Cria uma categoria associada ao usuário autenticado.
        """
        serializer.save(user=self.request.user)


# ViewSet para registro de novos usuários
class UserViewSet(viewsets.ViewSet):
    """
    ViewSet para registro de novos usuários.
    """
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], url_path='register')
    def register(self, request):
        """
        Endpoint para registrar novos usuários.
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({'message': 'Usuário criado com sucesso!'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API para obter clima da cidade
@api_view(['GET'])
def get_weather(request, city):
    """
    Endpoint para buscar clima de uma cidade.
    """
    api_key = settings.WEATHER_API_KEY
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()
        if response.status_code == 200:
            return Response(data)
        return Response({'error': data.get('message', 'Erro ao buscar clima')}, status=response.status_code)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# API para retornar os dados do usuário logado
class UserProfileView(APIView):
    """
    View para retornar os dados do usuário logado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'username': user.username,
            'email': user.email,
            # Campos adicionais podem ser adicionados aqui
        }
        return Response(data)
