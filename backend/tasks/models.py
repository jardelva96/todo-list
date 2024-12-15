from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    """
    Modelo para representar categorias de tarefas.
    Cada categoria está associada a um usuário específico.
    """
    name = models.CharField(max_length=100, verbose_name="Nome da Categoria")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Usuário",
        related_name="categories"
    )

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ['name']

    def __str__(self):
        return self.name


class Task(models.Model):
    """
    Modelo para representar tarefas.
    Cada tarefa está associada a um usuário e opcionalmente a uma categoria.
    """
    title = models.CharField(max_length=255, verbose_name="Título da Tarefa")
    description = models.TextField(blank=True, null=True, verbose_name="Descrição")
    is_completed = models.BooleanField(default=False, verbose_name="Concluído")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Usuário",
        related_name="tasks"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name="Categoria",
        related_name="tasks"
    )
    shared_with = models.ManyToManyField(
        User,
        related_name='shared_tasks',
        blank=True,
        verbose_name="Compartilhado com"
    )

    class Meta:
        verbose_name = "Tarefa"
        verbose_name_plural = "Tarefas"
        ordering = ['-created_at']

    def __str__(self):
        return self.title
