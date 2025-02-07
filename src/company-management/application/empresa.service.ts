import { IEmpresaRepository } from "../domain/interfaces/empresa.interface";
import { Empresa } from "../domain/entities/empresa";
import { EmpresaNotFound } from "../domain/exceptions/not-found.exception";
import { DeletedEmpresa } from "../domain/exceptions/deleted.exception";
import { ActiveEmpresa } from "../domain/exceptions/active.exception";
import { NombreEmpresaExists, RucEmpresaExists } from "../domain/exceptions/empresa-data-exists.exception";
import { InactiveEmpresa } from "../domain/exceptions/inactive.exception";

export class EmpresaService {
    private _empresaRepository: IEmpresaRepository;

    constructor(empresaRepository: IEmpresaRepository) {
        this._empresaRepository = empresaRepository;
    }

    public async getEmpresaById(id: number): Promise<Empresa>  {
        const empresa = await this._empresaRepository.getEmpresaById(id);

        if (!empresa)                   throw new EmpresaNotFound();
        if (empresa.isDeleted === 1)    throw new DeletedEmpresa();

        return empresa;
    }

    public async addEmpresa(nombre: string, ruc: string, logo: string, precioKilo: number): Promise<Empresa> {
        const empresa = new Empresa(nombre, ruc, logo, precioKilo);

        const validacionEmpresa = await this._empresaRepository.empresaExists(empresa);

        if (validacionEmpresa.nombreExists)   throw new NombreEmpresaExists();
        if (validacionEmpresa.rucExists)      throw new RucEmpresaExists(); 

        const createdEmpresa = await this._empresaRepository.addEmpresa(empresa);
        return createdEmpresa;
    }

    public async editEmpresa(id: number, updatedData: Partial<Empresa>): Promise<Empresa> {
        const existingEmpresa = await this._empresaRepository.getEmpresaById(id);

        if (!existingEmpresa)                  throw new EmpresaNotFound();
        if (existingEmpresa.status === false)  throw new InactiveEmpresa();
        if (existingEmpresa.isDeleted === 1)   throw new DeletedEmpresa();

        const validacionEmpresa = await this._empresaRepository.empresaExists({ ...existingEmpresa, ...updatedData }, id);

        if (validacionEmpresa.nombreExists)    throw new NombreEmpresaExists();
        if (validacionEmpresa.rucExists)       throw new RucEmpresaExists();

        const updatedEmpresa = await this._empresaRepository.editEmpresa(id, updatedData);
        return updatedEmpresa;
    }

    public async getAllEmpresas(): Promise<Empresa[]> {
        return await this._empresaRepository.getAllEmpresas();
    }

    public async getAllInactiveEmpresas(): Promise<Empresa[]> {
        return await this._empresaRepository.getAllInactiveEmpresas();
    }

    public async deactivateEmpresa(id: number): Promise<Empresa> {
        const existingEmpresa = await this._empresaRepository.getEmpresaById(id);

        if (!existingEmpresa)                   throw new EmpresaNotFound();
        if (existingEmpresa.isDeleted === 1)    throw new DeletedEmpresa();

        const empresa = await this._empresaRepository.deactivateEmpresa(id);
        return empresa;
    }

    public async activateEmpresa(id: number): Promise<Empresa> {
        const existingEmpresa = await this._empresaRepository.getEmpresaById(id);

        if (!existingEmpresa)                   throw new EmpresaNotFound();
        if (existingEmpresa.isDeleted === 1)    throw new DeletedEmpresa();

        const empresa = await this._empresaRepository.activateEmpresa(id);
        return empresa;
    }

    public async logicalEmpresaDeletion(id: number): Promise<Empresa> {
        const existingEmpresa = await this._empresaRepository.getEmpresaById(id);
        
        if (!existingEmpresa)                   throw new EmpresaNotFound();
        if (existingEmpresa.status === true)    throw new ActiveEmpresa();

        const empresa = await this._empresaRepository.logicalEmpresaDeletion(id);
        return empresa;
    }
}
