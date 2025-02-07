import { Request, Response } from "express";
import { GroupService } from "../../application/group.service";

export class GroupController {
    private _groupService: GroupService;

    constructor(groupService: GroupService) {
        this._groupService = groupService;
    }

    public async addGroup(req: Request, res: Response): Promise<void> {
        const { nombre, color } = req.body;

        try {
            const group = await this._groupService.addGroup(nombre, color);
            res.status(201).json(group);
        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getGroupById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const group = await this._groupService.getGroupById(Number(id));
            res.status(200).json(group);
        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async editGroup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const group = await this._groupService.editGroup(Number(id), updatedData);
            res.status(200).json(group);
        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getAllGroups(_req: Request, res: Response): Promise<void> {
        try {
            const groups = await this._groupService.getAllGroups();
            res.status(200).json(groups);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAllInactiveGroups(_req: Request, res: Response): Promise<void> {
        try {
            const inactiveGroups = await this._groupService.getAllInactiveGroups();
            res.status(200).json(inactiveGroups);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deactivateGroup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deactivatedGroup = await this._groupService.deactivateGroup(Number(id));
            res.status(200).json(deactivatedGroup);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async activateGroup(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const activatedGroup = await this._groupService.activateGroup(Number(id));
            res.status(200).json(activatedGroup);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async logicalGroupDeletion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deletedGroup = await this._groupService.logicalGroupDeletion(Number(id));
            res.status(200).json(deletedGroup);
        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }
}
