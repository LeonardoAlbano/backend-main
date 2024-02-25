// Importa o módulo Router do framework Express
import { Router } from 'express';

// Importa as rotas relacionadas aos usuários do arquivo './user.routes'
import userRoutes from './user.routes';

// Cria uma instância do Router do Express
const router = Router();

// Define uma rota '/users' que utiliza as rotas relacionadas aos usuários importadas anteriormente
router.use("/users", userRoutes);

// Exporta o router para que possa ser utilizado em outros arquivos
export default router;
