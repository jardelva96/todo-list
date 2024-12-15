🌟 Gerenciador de Tarefas (To-Do List)

Este projeto consiste em uma aplicação web de gerenciamento de tarefas, desenvolvida como parte de um teste prático. A aplicação permite que os usuários registrem, visualizem, editem e excluam tarefas, além de marcar tarefas como concluídas ou pendentes. O sistema também oferece funcionalidades avançadas como autenticação, filtragem, paginação, e integração com contêineres Docker para fácil configuração e deploy.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend
- **React.js**: Framework JavaScript para construção da interface do usuário.
- **CSS**: Estilo visual das páginas, com design moderno e responsivo.

### 🛠️ Backend
- **Django REST Framework**: Framework poderoso para a construção de APIs RESTful com Python.
- **Django**: Framework backend para construção de aplicações web robustas.
- **SQLite**: Banco de dados local usado para armazenamento de dados durante o desenvolvimento.

### 🔒 Autenticação
- **JWT (JSON Web Token)**: Implementado com o Django REST Framework para autenticação segura entre o frontend e o backend.

### 📦 Contêineres
- **Docker**: Para criar contêineres que encapsulam toda a aplicação e dependências.
- **Docker Compose**: Para orquestrar múltiplos contêineres (frontend, backend e banco de dados).

### 🧪 Testes
- **pytest**: Framework de testes para o backend.
- **Selenium**: Para testes end-to-end no frontend.

### 🔧 CI/CD 
- Ferramentas de integração contínua para automatizar testes e deploy.

### ☁️ Deploy
- **AWS**: Implementação da aplicação em uma plataforma de nuvem.

---

## 🌟 Funcionalidades

### ✅ Funcionalidades Obrigatórias
1. **CRUD de Tarefas**
   - Criar, ler, atualizar e excluir tarefas.
2. **Autenticação de Usuário**
   - Registro e login de usuários.
3. **Marcar Tarefas**
   - Alterar status de tarefas como concluídas ou pendentes.
4. **Filtragem e Paginação**
   - Buscar e navegar entre tarefas.
5. **Frontend em React**
6. **Backend em Django REST Framework**
7. **Dockerização**
   - Uso de Docker e Docker Compose para configurar o ambiente.
8. **Testes Unitários no Backend**
   - Implementados com pytest.

### 🌟 Funcionalidades
1. **Categorias**
   - Criação e gerenciamento de categorias para organização das tarefas.
2. **Compartilhamento de Tarefas**
   - Permitir que usuários compartilhem tarefas com outros usuários.
3. **Integração com API Externa**
   - Uso de APIs de clima, notícias ou outras para enriquecer o projeto.

---

## 📚 Como Rodar o Projeto

### 🔧 Requisitos
1. **Node.js** (versão 16 ou superior)
2. **Python** (versão 3.10 ou superior)
3. **Docker** e **Docker Compose**

### 🛠️ Passos para Configuração

#### 1️⃣ Clonar o Repositório
bash
# Clone o repositório
$ git clone https://github.com/usuario/todo-list.git

# Acesse a pasta do projeto
$ cd todo-list


#### 2️⃣ Configuração do Backend

1. Navegue para o diretório do backend:
bash
$ cd backend


2. Crie um ambiente virtual e instale as dependências:
bash
# Criar ambiente virtual
$ python -m venv venv

# Ativar ambiente virtual (Linux/Mac)
$ source venv/bin/activate

# Ativar ambiente virtual (Windows)
$ venv\Scripts\activate

# Instalar dependências
$ pip install -r requirements.txt


3. Configure o banco de dados e crie as migrações:
bash
$ python manage.py makemigrations
$ python manage.py migrate


4. Inicie o servidor backend:
bash
$ python manage.py runserver


#### 3️⃣ Configuração do Frontend

1. Navegue para o diretório do frontend:
bash
$ cd ../frontend


2. Instale as dependências:
bash
$ npm install


3. Inicie o servidor frontend:
bash
$ npm start


#### 4️⃣ Uso de Docker

1. Certifique-se de estar no diretório raiz do projeto.
2. Execute o comando abaixo para iniciar os contêineres:
bash
$ docker-compose up --build


3. Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).
---
##📊 Monitoramento com Prometheus e Grafana

###🔧 Prometheus
- O Prometheus coleta métricas de tempo real da aplicação e permite monitorá-la com visualizações ricas no Grafana. Para configurar o Prometheus:
-- Configuração do Prometheus:
-- O arquivo de configuração prometheus.yml está presente no repositório.
-- O Prometheus está configurado para coletar métricas do backend em /metrics.
-- Subindo o Prometheus com Docker: Execute o comando abaixo para subir o contêiner do Prometheus:
-- docker-compose up -d prometheus
-- O Prometheus ficará disponível em http://localhost:9090.

###🔧 Grafana
-- O Grafana será usado para visualizar as métricas coletadas pelo Prometheus. Para configurar o Grafana:
- Subindo o Grafana com Docker: Execute o comando abaixo para iniciar o Grafana:
- docker-compose up -d grafana
- Acessando o Grafana: O Grafana ficará disponível em http://localhost:3001.
- A senha padrão para login é admin.
- Configurando o Prometheus no Grafana: Após fazer login no Grafana, configure o Prometheus como uma fonte de dados:
- Vá em Configuration > Data Sources > Add Data Source.
- Selecione Prometheus e adicione a URL http://prometheus:9090.
- Criando Dashboards: Agora você pode criar dashboards no Grafana para visualizar as métricas da sua aplicação.

---
'''
## 📂 Estrutura de Diretórios
/
├── backend/            # Código do backend em Django
│   ├── tasks/          # Aplicação de gerenciamento de tarefas
│   ├── venv/           # Ambiente virtual
│   ├── manage.py       # Gerenciador do Django
│   └── requirements.txt # Dependências do Python
├── frontend/           # Código do frontend em React
│   ├── src/            # Código-fonte React
│   ├── public/         # Arquivos públicos
│   └── package.json    # Dependências do Node.js
├── docker-compose.yml  # Arquivo de orquestração Docker
└── README.md           # Documentação do projeto
'''

---

## 🧪 Testes

### 🛠️ Backend
Para rodar os testes no backend:
bash
$ cd backend
$ pytest


### 🖥️ Frontend
Para rodar testes no frontend:
bash
$ cd frontend
$ npm test


---

## 🌟 Melhorias Futuras
- Adicionar mais APIs externas para enriquecer funcionalidades.
- Melhorar o design com bibliotecas como Material-UI ou TailwindCSS.
- Configurar deploy automatizado com CI/CD.

---

## 🤝 Contribuições
Sugestões e melhorias são bem-vindas! Por favor, envie um Pull Request ou abra uma Issue no repositório.

---

## 📬 Contato
Para dúvidas ou suporte, envie um e-mail para jardel.va96@gmail.com. 📧
