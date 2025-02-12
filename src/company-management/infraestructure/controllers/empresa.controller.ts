import { Request, Response } from "express";
import { EmpresaService } from "../../application/services/empresa.service";

export class EmpresaController {
    private _empresaService: EmpresaService;

    constructor(empresaService: EmpresaService) {
        this._empresaService = empresaService;
    }

    public async addEmpresa(req: Request, res: Response): Promise<void> {
        const { nombre,ruc, logo, precioPorKilo } = req.body;

        try {
            const empresa = await this._empresaService.addEmpresa(nombre,ruc, logo, precioPorKilo);
            res.status(201).json(empresa);
        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getEmpresaById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const empresa = await this._empresaService.getEmpresaById(Number(id));
            res.status(200).json(empresa);
        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async editEmpresa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedData = req.body;

        try {
            const empresa = await this._empresaService.editEmpresa(Number(id), updatedData);
            res.status(200).json(empresa);
        } catch (error: any) {
            res.status(404).json({
                error: error.name,
                message: error.message
            });
        }
    }

    public async getAllEmpresas(_req: Request, res: Response): Promise<void> {
        try {
            const empresas = await this._empresaService.getAllEmpresas();
            res.status(200).json(empresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAllInactiveEmpresas(_req: Request, res: Response): Promise<void> {
        try {
            const inactiveEmpresas = await this._empresaService.getAllInactiveEmpresas();
            res.status(200).json(inactiveEmpresas);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deactivateEmpresa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deactivatedEmpresa = await this._empresaService.deactivateEmpresa(Number(id));
            res.status(200).json(deactivatedEmpresa);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async activateEmpresa(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const activatedEmpresa = await this._empresaService.activateEmpresa(Number(id));
            res.status(200).json(activatedEmpresa);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async logicalEmpresaDeletion(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const deletedEmpresa = await this._empresaService.logicalEmpresaDeletion(Number(id));
            res.status(200).json(deletedEmpresa);
        } catch (error: any) {
            res.status(500).json({
                error: error.name,
                message: error.message
            });
        }
    }
}
