import express from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../application/user.service';
import { UserRepositoryPrismaMysql } from '../user.repository';
import { BcryptPasswordHasher } from '../utils/bcrypt-password-hasher';
import { JwtTokenGenerator } from '../utils/jwt-token-generator'; 
import { verifyToken } from '../middlewares/middleware';

const userRepository = new UserRepositoryPrismaMysql();
const passwordHasher = new BcryptPasswordHasher();
const jwtTokenGenerator = new JwtTokenGenerator('your_jwt_secret');

const userService = new UserService(userRepository, passwordHasher, jwtTokenGenerator);

const userController = new UserController(userService);

const userRouter = express.Router();

userRouter.post('/login', (req, res)=> userController.login(req, res));

userRouter.post('/add'
    ,verifyToken(['admin'])
    , (req, res) => userController.addUser(req, res));

userRouter.get('/inactives' 
    ,verifyToken(['admin'])
    ,(req, res) => userController.getAllInActiveUsers(req, res));

userRouter.patch('/deactivate/:id'
    ,verifyToken(['admin'])
    ,(req, res) => userController.deactivateUser(req, res)); 

userRouter.patch('/activate/:id'
    ,verifyToken(['admin'])
    ,(req, res) => userController.activateUser(req, res));

userRouter.patch('/delete/:id'
    ,verifyToken(['admin'])
    ,(req, res) => userController.logicalUserDeletion(req, res));

userRouter.get('/:id'
    ,verifyToken(['admin'])
    ,(req, res) => userController.getUserById(req, res));

userRouter.put('/:id'
    ,verifyToken(['admin'])
    ,(req, res) => userController.editUser(req, res));

userRouter.get('/'
    ,verifyToken(['admin'])
    ,(req, res) => userController.getAllUsers(req, res)); 

export default userRouter;