# 🌍 Weather API - Backend

Este é o backend da aplicação Weather App, responsável por fornecer dados meteorológicos e autenticação de usuários. A API foi desenvolvida com **Node.js**, **Express** e **MongoDB**, utilizando **Jest** para testes e suporte a **Docker** para facilitar a execução.
Desenvolvido por: Alexandre Bento Pereira.
Utilizando a API OpenWeatherMap para coleta de dados.

---

## 📁 **Estrutura do Projeto**
```
backend/
│── src/
│   ├── config/          # Configurações gerais (banco, autenticação, etc.)
│   ├── controllers/     # Lógica das rotas (Login, Registro, Previsão do Tempo e integração com OpenWeatherMap)
│   ├── middlewares/     # Middleware de autenticação JWT
│   ├── models/          # Modelos do banco de dados (Mongoose)
│   ├── routes/          # Definição das rotas da API
│   ├── tests/           # Testes automatizados com Jest
│── .env.example         # Exemplo do arquivo de variáveis de ambiente
│── Dockerfile           # Configuração para Docker
│── docker-compose.yml   # Arquivo para subir backend + MongoDB com Docker
│── package.json         # Dependências do projeto
│── README.md            # Documentação
├── server.js            # Configuração principal do Express e inicialização do servidor
```

---

## 🛠 **Tecnologias Utilizadas**
- **Node.js** - Ambiente de execução JavaScript no servidor
- **Express.js** - Framework para criar a API
- **MongoDB** - Banco de dados NoSQL para armazenar usuários e histórico
- **Mongoose** - ODM para manipulação do MongoDB
- **jsonwebtoken (JWT)** - Autenticação segura
- **bcrypt** - Criptografia de senhas
- **axios** - Requisições HTTP para obter dados meteorológicos
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Jest & Supertest** - Testes automatizados
- **Docker** - Containerização do backend e banco de dados
- **Redis** - Gerenciamento da Cache dos dados

---

## 🚀 **Como Rodar o Projeto**

### **1️⃣ Executando SEM Docker**
#### ✅ **Pré-requisitos**
- Node.js instalado (`v16` ou superior)
- MongoDB instalado e rodando localmente

#### **📀 Passo a passo**
1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/weather-app-backend.git
   cd weather-app-backend
   ```

2. **Crie um arquivo `.env` baseado no exemplo disponível e adicione a sua chave da Api do OpenWeatherMap na variável WEATHER_API_KEY dentro do arquivo .env criado:**
   ```sh
   cp .env.example .env
   ```

3. **Instale as dependências:**
   ```sh
   npm install
   ```

4. **Inicie o servidor (modo desenvolvimento):**
   ```sh
   npm run dev
   ```

5. **A API estará disponível em:**
   ```
   http://localhost:5000
   ```

---

### **2️⃣ Executando COM Docker**
#### ✅ **Pré-requisitos**
- Docker instalado
- Docker Compose instalado

#### **📀 Passo a passo**
1. **Clone o repositório e entre no diretório:**
   ```sh
   git clone https://github.com/seu-usuario/weather-app-backend.git
   cd weather-app-backend
   ```

2. **Abra o arquivo docker-compose.yml e adicione a sua chave da Api do OpenWeatherMap na variável WEATHER_API_KEY**
   ```sh
   environment:
      - MONGO_URI=mongodb://mongodb:27017/weatherdb
      - JWT_SECRET=SecretKeyJWTProd1234567890
      - WEATHER_API_KEY=SUA_CHAVE_AQUI
      - REDIS_HOST=redis
      - REDIS_PORT=6379
   ```

3. **Suba os containers (API + Banco de Dados) com Docker Compose:**
   ```sh
   docker-compose up --build -d
   ```

4. **Verifique os logs do backend:**
   ```sh
   docker logs -f weather-backend
   ```

5. **A API estará disponível em:**
   ```
   http://localhost:5000
   ```

6. **Para parar os containers:**
   ```sh
   docker-compose down
   ```

---

### **🚀 Rodando os testes**
- Testes
```sh
   npm run test
   ```

- Cobertura dos testes
```sh
   npm run test:coverage
   ```

---

## ✅ **Rotas Disponíveis**
### **🛡️ Autenticação**
- **POST** `/api/auth/register` - Cadastro de usuário
- **POST** `/api/auth/login` - Login e obtenção de token JWT

### **🌤️ Previsão do Tempo**
- **GET** `/api/weather?city={cidade}` - Obtém a previsão do tempo por cidade
- **GET** `/api/weather?lat={lat}&lon={lon}` - Obtém a previsão do tempo por coordenadas

### **🕒 Histórico**
- **GET** `/api/history` - Obtém as últimas 5 previsões pesquisadas (autenticado)

---

## 🧐 **Possíveis Erros e Soluções**
| Erro | Causa | Solução |
|------|-------|---------|
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB não está rodando | Verifique se MongoDB está iniciado (`docker-compose up` ou `mongod`) |
| `Error: Token inválido` | Token JWT expirado ou incorreto | Faça login novamente para obter um novo token |
| `Request failed with status code 400` | Chave da API do OpenWeatherMap errada | Confirme sua `WEATHER_API_KEY` no `.env` |

---

## 🎓 **Licença**
Este projeto é open-source e está sob a licença **MIT**.

---
