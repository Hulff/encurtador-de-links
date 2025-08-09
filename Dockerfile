# Usa node 18 alpine como base
FROM node:18-alpine

# Define diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do código
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta que o Nest usa (3000 padrão)
EXPOSE 3000

# Comando para iniciar a aplicação já compilada
CMD ["node", "dist/main.js"]
