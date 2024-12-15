# Use uma imagem base com Python
FROM python:3.10-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt /app/

# Instale as dependências do requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copie o restante dos arquivos para o container
COPY . /app/

# Exponha a porta em que o Django estará rodando
EXPOSE 8000

# Comando para iniciar o Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
