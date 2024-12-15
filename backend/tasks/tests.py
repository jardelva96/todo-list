import pytest
from django.contrib.auth.models import User
from .models import Task, Category

@pytest.mark.django_db
def test_create_task():
    """
    Teste para criar uma tarefa.
    """
    user = User.objects.create_user(username='testuser', password='12345')
    task = Task.objects.create(title='Test Task', user=user)
    assert task.title == 'Test Task'
    assert task.user == user
    assert not task.is_completed


@pytest.mark.django_db
def test_create_category():
    """
    Teste para criar uma categoria.
    """
    user = User.objects.create_user(username='testuser', password='12345')
    category = Category.objects.create(name='Work', user=user)
    assert category.name == 'Work'
    assert category.user == user


@pytest.mark.django_db
def test_task_with_category():
    """
    Teste para associar uma tarefa a uma categoria.
    """
    user = User.objects.create_user(username='testuser', password='12345')
    category = Category.objects.create(name='Personal', user=user)
    task = Task.objects.create(title='Test Task', user=user, category=category)
    assert task.category == category
    assert task.category.name == 'Personal'


@pytest.mark.django_db
def test_task_shared_with_users():
    """
    Teste para compartilhar uma tarefa com outros usuários.
    """
    owner = User.objects.create_user(username='owner', password='12345')
    shared_user = User.objects.create_user(username='shareduser', password='12345')
    task = Task.objects.create(title='Shared Task', user=owner)
    task.shared_with.add(shared_user)

    assert task.shared_with.count() == 1
    assert shared_user in task.shared_with.all()


@pytest.mark.django_db
def test_task_mark_as_completed():
    """
    Teste para marcar uma tarefa como concluída.
    """
    user = User.objects.create_user(username='testuser', password='12345')
    task = Task.objects.create(title='Test Task', user=user)
    task.is_completed = True
    task.save()

    assert task.is_completed
