// Importa o framework Express
import express from "express";

// Importa o módulo CORS para permitir requisições de origens diferentes
import cors from "cors";

// Importa as rotas relacionadas aos usuários do arquivo "./routes/user.routes"
import userRoutes from "./routes/user.routes";

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor irá escutar as requisições
const PORT = 3000;

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Middleware para habilitar o CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Define que as requisições para a raiz ("/") serão tratadas pelas rotas relacionadas aos usuários
app.use("/", userRoutes);

// Inicia o servidor Express para escutar as requisições na porta especificada
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
