import { IEmpresaRepository } from "../domain/interfaces/empresa.interface";
import { Empresa } from "../domain/empresa";
import { EmpresaNotFound } from "../domain/exceptions/not-found.exception";

export class EmpresaService {
    private _empresaRepository: IEmpresaRepository;

    constructor(empresaRepository: IEmpresaRepository) {
        this._empresaRepository = empresaRepository;
    }

    public async addEmpresa(nombre: string, logo: string, precioKilo: number): Promise<Empresa> {
        const empresa = new Empresa(nombre, logo, precioKilo);
        const createdEmpresa = await this._empresaRepository.addEmpresa(empresa);
        return createdEmpresa;
    }

    public async getEmpresaById(id: number): Promise<Empresa> {
        const empresa = await this._empresaRepository.getEmpresaById(id);
        if (!empresa) {
            throw new EmpresaNotFound();
        }
        return empresa;
    }

    public async editEmpresa(id: number, updatedData: Partial<Empresa>): Promise<Empresa> {
        const updatedEmpresa = await this._empresaRepository.editEmpresa(id, updatedData);
        if (!updatedEmpresa) {
            throw new EmpresaNotFound();
        }
        return updatedEmpresa;
    }

    public async getAllEmpresas(): Promise<Empresa[]> {
        const activeEmpresas = await this._empresaRepository.getAllEmpresas();
        return activeEmpresas;
    }

    public async getAllInactiveEmpresas(): Promise<Empresa[]> {
        const inactiveEmpresas = await this._empresaRepository.getAllInactiveEmpresas();
        return inactiveEmpresas;
    }

    public async deactivateEmpresa(id: number): Promise<Empresa> {
        const empresa = await this._empresaRepository.deactivateEmpresa(id);
        if (!empresa) {
            throw new EmpresaNotFound();
        }
        return empresa;
    }

    public async activateEmpresa(id: number): Promise<Empresa> {
        const empresa = await this._empresaRepository.activateEmpresa(id);
        if (!empresa) {
            throw new EmpresaNotFound();
        }
        return empresa;
    }

    public async logicalEmpresaDeletion(id: number): Promise<Empresa> {
        const empresa = await this._empresaRepository.logicalEmpresaDeletion(id);
        if (!empresa) {
            throw new EmpresaNotFound();
        }
        return empresa;
    }
}
