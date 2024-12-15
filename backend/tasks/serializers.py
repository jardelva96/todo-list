from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task, Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de Categoria.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'user']
        extra_kwargs = {
            'user': {'read_only': True}
        }


class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de Tarefa.
    """
    shared_with = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
        required=False
    )
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        required=False
    )

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'is_completed',
            'created_at', 'updated_at', 'shared_with', 'category', 'user'
        ]
        extra_kwargs = {
            'user': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para criar novos usuários.
    """
    password = serializers.CharField(write_only=True)  # Senha apenas para escrita
    email = serializers.EmailField(required=True)  # Email obrigatório

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Incluindo email no serializer
        extra_kwargs = {
            'password': {'write_only': True},  # Garantindo que a senha não será retornada
        }

    def validate(self, data):
        """
        Valida os dados fornecidos, garantindo que o nome de usuário e o email sejam únicos.
        """
        # Verificando se o nome de usuário já está registrado
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("O nome de usuário já está em uso.")
        
        # Verificando se o email já está registrado
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("O email já está em uso.")
        
        return data

    def create(self, validated_data):
        """
        Cria um novo usuário com as credenciais fornecidas.
        A senha será criptografada automaticamente.
        """
        # Criando o usuário com os dados validados
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],  # Incluindo o email
            password=validated_data['password']
        )
        return user
