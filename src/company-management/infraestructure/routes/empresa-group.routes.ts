import express from "express";
import { EmpresaGroupController } from "../controllers/empresa-group.controller";
import { EmpresaGroupService } from "../../application/empresa-group.service";
import { EmpresaGroupRepositoryPrismaMysql } from "../repositories/empresa-group.repository";
import { verifyToken } from "../../../user-management/infraestructure/middlewares/verify-token";

const empresaGroupRepository = new EmpresaGroupRepositoryPrismaMysql();
const empresaGroupService = new EmpresaGroupService(empresaGroupRepository);
const empresaGroupController = new EmpresaGroupController(empresaGroupService);

const empresaGroupRouter = express.Router();

empresaGroupRouter.post("/add",
    verifyToken(["admin"]),
    (req, res) => empresaGroupController.addEmpresaGroup(req, res)
);

empresaGroupRouter.get("/inactives",
    verifyToken(["admin"]),
    (req, res) => empresaGroupController.getAllInactiveEmpresaGroups(req, res)
);

empresaGroupRouter.patch("/deactivate/:id",
    verifyToken(["admin"]),
    (req, res) => empresaGroupController.deactivateEmpresaGroup(req, res)
);

empresaGroupRouter.patch("/activate/:id",
    verifyToken(["admin"]),
    (req, res) => empresaGroupController.activateEmpresaGroup(req, res)
);

empresaGroupRouter.patch("/delete/:id",
    verifyToken(["admin"]),
    (req, res) => empresaGroupController.logicalEmpresaGroupDeletion(req, res)
);

empresaGroupRouter.get("/:id",
    verifyToken(["admin", "user"]),
    (req, res) => empresaGroupController.getEmpresaGroupById(req, res)
);

empresaGroupRouter.put("/:id",
    verifyToken(["admin"]),
    (req, res) => empresaGroupController.editEmpresaGroup(req, res)
);

empresaGroupRouter.get("/",
    verifyToken(["admin", "user"]),
    (req, res) => empresaGroupController.getAllEmpresaGroups(req, res)
);

export default empresaGroupRouter;
