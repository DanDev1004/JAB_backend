import express from 'express';
import { TokenGeneratorController } from '../controllers/token-generator.controller';
import { TokenGeneratorService } from '../../application/services/token-generator.service';
import { UserRepositoryPrismaMysql } from '../user.repository';
import { BcryptPasswordHasher } from '../password-hasher.repository';
import { JwtTokenGenerator } from '../token-generator.repository';

const userRepository = new UserRepositoryPrismaMysql();
const passwordHasher = new BcryptPasswordHasher();
const jwtTokenGenerator = new JwtTokenGenerator(process.env.KEY_SECRET || '');

const tokenService = new TokenGeneratorService(userRepository, passwordHasher, jwtTokenGenerator);
const authController = new TokenGeneratorController(tokenService);

const authRouter = express.Router();

authRouter.post('/login', (req, res) => authController.login(req, res));

export default authRouter;
