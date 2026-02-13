FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Arranca directamente Node
CMD ["node", "index.js"]


