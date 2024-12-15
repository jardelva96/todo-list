# Usar a imagem oficial do Node.js como base
FROM node:16

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de pacotes (package.json e package-lock.json)
COPY package.json package-lock.json /app/

# Instalar as dependências do frontend
RUN npm install

# Copiar o código da aplicação para o contêiner
COPY . /app/

# Expor a porta do React (3000)
EXPOSE 3000

# Rodar a aplicação React
CMD ["npm", "start"]
