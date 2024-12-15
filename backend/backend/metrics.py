from prometheus_client import generate_latest, Summary
from django.http import HttpResponse
import time
import random

# Métrica exemplo (Total de requisições HTTP)
REQUESTS = Summary('http_requests_total', 'Total de requisições HTTP')

# Função monitoramento com contagem de exceções
@REQUESTS.time()  # Usamos o .time() para medir o tempo de execução das funções
def monitor_request():
    """Função para simular requisições"""
    time.sleep(random.uniform(0.1, 0.5))  # Simula algum tempo de execução aleatório

# Função para expor as métricas
def metrics(request):
    """Expondo as métricas para o Prometheus"""
    monitor_request()  # Chama a função para registrar as métricas
    return HttpResponse(generate_latest(), content_type="text/plain; charset=utf-8")
