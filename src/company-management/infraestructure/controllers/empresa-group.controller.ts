import { Request, Response } from "express";
import { EmpresaGroupService } from "../../application/empresa-group.service";

export class EmpresaGroupController {
    private _empresaGroupService: EmpresaGroupService;

    constructor(empresaGroupService: EmpresaGroupService) {
        this._empresaGroupService = empresaGroupService;
    }

    public async addEmpresaGroup(req: Request, res: Response): Promise<void> {
        const { empresaId, groupId } = req.body;

        try {
            const empresaGroup = await this._empresaGroupService.addEmpresaGroup(empresaId, groupId);
            res.status(201).json(empresaGroup);
        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getEmpresaGroupById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const empresaGroup = await this._empresaGroupService.getEmpresaGroupById(Number(id));
            res.status(200).json(empresaGroup);
        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async editEmpresaGroup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const empresaGroup = await this._empresaGroupService.editEmpresaGroup(Number(id), updatedData);
            res.status(200).json(empresaGroup);
        } catch (error: any) {
            res.status(400).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getAllEmpresaGroups(_req: Request, res: Response): Promise<void> {
        try {
            const empresaGroups = await this._empresaGroupService.getAllEmpresaGroups();
            res.status(200).json(empresaGroups);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAllInactiveEmpresaGroups(_req: Request, res: Response): Promise<void> {
        try {
            const inactiveEmpresaGroups = await this._empresaGroupService.getAllInactiveEmpresaGroups();
            res.status(200).json(inactiveEmpresaGroups);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deactivateEmpresaGroup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deactivatedEmpresaGroup = await this._empresaGroupService.deactivateEmpresaGroup(Number(id));
            res.status(200).json(deactivatedEmpresaGroup);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async activateEmpresaGroup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const activatedEmpresaGroup = await this._empresaGroupService.activateEmpresaGroup(Number(id));
            res.status(200).json(activatedEmpresaGroup);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async logicalEmpresaGroupDeletion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deletedEmpresaGroup = await this._empresaGroupService.logicalEmpresaGroupDeletion(Number(id));
            res.status(200).json(deletedEmpresaGroup);
        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }
}
