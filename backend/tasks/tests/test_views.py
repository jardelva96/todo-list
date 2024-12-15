import pytest
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from tasks.models import Task, Category
from rest_framework.test import APIClient  # Importando o APIClient do DRF

@pytest.fixture
def user():
    user = User.objects.create_user(username='testuser', password='12345')
    return user

@pytest.fixture
def category(user):
    return Category.objects.create(name="Work", user=user)

@pytest.fixture
def task(user, category):
    return Task.objects.create(
        title="Test Task",
        description="Test Description",
        user=user,
        category=category
    )

@pytest.fixture
def api_client():
    return APIClient()  # Definindo o APIClient para os testes

@pytest.mark.django_db
def test_update_task(api_client, user, task):
    url = reverse('task-detail', kwargs={'pk': task.id})
    data = {
        'title': 'Updated Task',
        'description': 'Updated Description',
        'category': task.category.id
    }
    
    # Autenticando o usuário usando force_authenticate
    api_client.force_authenticate(user=user) 
    
    response = api_client.put(url, data)
    
    assert response.status_code == status.HTTP_200_OK
    assert response.data['title'] == 'Updated Task'

@pytest.mark.django_db
def test_delete_task(api_client, user, task):
    url = reverse('task-detail', kwargs={'pk': task.id})

    # Autenticando o usuário usando force_authenticate
    api_client.force_authenticate(user=user)
    
    response = api_client.delete(url)
    
    assert response.status_code == status.HTTP_204_NO_CONTENT
