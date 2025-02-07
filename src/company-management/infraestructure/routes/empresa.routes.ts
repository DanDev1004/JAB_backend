import express from 'express';
import { EmpresaController } from '../controllers/empresa.controller';
import { EmpresaService } from '../../application/empresa.service';
import { EmpresaRepositoryPrismaMysql } from '../repositories/empresa.repository';
import { verifyToken } from '../../../user-management/infraestructure/middlewares/verify-token';

const empresaRepository = new EmpresaRepositoryPrismaMysql();
const empresaService = new EmpresaService(empresaRepository);
const empresaController = new EmpresaController(empresaService);

const empresaRouter = express.Router();

empresaRouter.post('/add',
    verifyToken(['admin']),
    (req, res) => empresaController.addEmpresa(req, res)
);

empresaRouter.get('/inactives',
    verifyToken(['admin']),
    (req, res) => empresaController.getAllInactiveEmpresas(req, res)
);

empresaRouter.patch('/deactivate/:id',
    verifyToken(['admin']),
    (req, res) => empresaController.deactivateEmpresa(req, res)
);

empresaRouter.patch('/activate/:id',
    verifyToken(['admin']),
    (req, res) => empresaController.activateEmpresa(req, res)
);

empresaRouter.patch('/delete/:id',
    verifyToken(['admin']),
    (req, res) => empresaController.logicalEmpresaDeletion(req, res)
);

empresaRouter.get('/:id',
    verifyToken(['admin', 'user']),
    (req, res) => empresaController.getEmpresaById(req, res)
);

empresaRouter.put('/:id',
    verifyToken(['admin']),
    (req, res) => empresaController.editEmpresa(req, res)
);

empresaRouter.get('/',
    verifyToken(['admin', 'user']),
    (req, res) => empresaController.getAllEmpresas(req, res)
);


export default empresaRouter;
