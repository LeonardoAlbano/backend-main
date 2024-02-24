import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.getUser.bind(userController));
userRoutes.post("/", userController.createUser.bind(userController));
userRoutes.put("/:id", userController.updateUser.bind(userController));
userRoutes.delete("/:id", userController.deleteUser.bind(userController));

export default userRoutes;
