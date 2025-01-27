import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../application/user.service';
import { UserRepositoryPrismaMysql } from '../user.repository';
import { BcryptPasswordHasher } from '../utils/bcrypt-password-hasher';

const userRepository = new UserRepositoryPrismaMysql();
const passwordHasher = new BcryptPasswordHasher();

const userService = new UserService(userRepository, passwordHasher);

const userController = new UserController(userService);

const userRouter = express.Router();

userRouter.post('/add', (req, res) => userController.addUser(req, res));
userRouter.get('/inactive', (_req, res) => userController.getAllInActiveUsers(_req, res));
userRouter.patch('/deactivate/:id', (req, res) => userController.deactivateUser(req, res)); 
userRouter.patch('/activate/:id', (req, res) => userController.activateUser(req, res));
userRouter.patch('/delete/:id', (req, res) => userController.logicalUserDeletion(req, res));
userRouter.get('/:id', (req, res) => userController.getUserById(req, res));
userRouter.put('/:id', (req, res) => userController.editUser(req, res));
userRouter.get('/', (req, res) => userController.getAllUsers(req, res)); 

export default userRouter;