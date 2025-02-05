import express from 'express';
import { GroupController } from '../controllers/group.controller';
import { GroupService } from '../../application/group.service';
import { GroupRepositoryPrismaMysql } from '../group.repository';
import { verifyToken } from '../../../user-management/infraestructure/middlewares/verify-token';

const groupRepository = new GroupRepositoryPrismaMysql();
const groupService = new GroupService(groupRepository);
const groupController = new GroupController(groupService);

const groupRouter = express.Router();

groupRouter.post('/add',
    verifyToken(['admin']),
    (req, res) => groupController.addGroup(req, res)
);

groupRouter.get('/inactives',
    verifyToken(['admin']),
    (req, res) => groupController.getAllInactiveGroups(req, res)
);

groupRouter.patch('/deactivate/:id',
    verifyToken(['admin']),
    (req, res) => groupController.deactivateGroup(req, res)
);

groupRouter.patch('/activate/:id',
    verifyToken(['admin']),
    (req, res) => groupController.activateGroup(req, res)
);

groupRouter.patch('/delete/:id',
    verifyToken(['admin']),
    (req, res) => groupController.logicalGroupDeletion(req, res)
);

groupRouter.get('/:id',
    verifyToken(['admin','user']),
    (req, res) => groupController.getGroupById(req, res)
);

groupRouter.put('/:id',
    verifyToken(['admin']),
    (req, res) => groupController.editGroup(req, res)
);

groupRouter.get('/',
    verifyToken(['admin','user']),
    (req, res) => groupController.getAllGroups(req, res)
);

export default groupRouter;
