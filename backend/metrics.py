from prometheus_client import generate_latest, Summary
from django.http import HttpResponse
import time
import random

# Métrica exemplo (Total de requisições HTTP)
REQUESTS = Summary('http_requests_total', 'Total de requisições HTTP')

@REQUESTS.count_exceptions()
def monitor_request():
    """Função para simular requisições"""
    pass

# Função para expor as métricas
def metrics(request):
    """Expondo as métricas para o Prometheus"""
    return HttpResponse(generate_latest(), content_type="text/plain; charset=utf-8")
