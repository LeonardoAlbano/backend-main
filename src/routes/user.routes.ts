// Importa o módulo Router do framework Express
import { Router } from 'express';

// Importa o controlador UserController do arquivo '../controllers/UserController'
import UserController from '../controllers/UserController';

// Cria uma instância do Router do Express
const userRoutes = Router();

// Cria uma instância do controlador UserController
const userController = new UserController();

// Define uma rota GET para a raiz ("/") que chama o método getUser do UserController
userRoutes.get("/", userController.getUser.bind(userController));

// Define uma rota POST para a raiz ("/") que chama o método createUser do UserController
userRoutes.post("/", userController.createUser.bind(userController));

// Define uma rota PUT para '/:id' que chama o método updateUser do UserController
// ':id' é um parâmetro na URL que representa o ID do usuário a ser atualizado
userRoutes.put("/:id", userController.updateUser.bind(userController));

// Define uma rota DELETE para '/:id' que chama o método deleteUser do UserController
// ':id' é um parâmetro na URL que representa o ID do usuário a ser excluído
userRoutes.delete("/:id", userController.deleteUser.bind(userController));

// Exporta as rotas de usuário para que possam ser utilizadas em outros arquivos
export default userRoutes;
