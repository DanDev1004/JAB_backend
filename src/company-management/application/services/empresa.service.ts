import { IEmpresaRepository } from "../../domain/interfaces/empresa.interface";
import { Empresa } from "../../domain/entities/empresa";
import { EmpresaValidator } from "../validators/empresa.validator";

export class EmpresaService {
    private _empresaRepository: IEmpresaRepository;

    constructor(empresaRepository: IEmpresaRepository) {
        this._empresaRepository = empresaRepository;
    }

    public async getEmpresaById(id: number): Promise<Empresa>  {
        return await EmpresaValidator.validateEmpresaExists(this._empresaRepository, id);
    }

    public async addEmpresa(nombre: string, ruc: string, logo: string, precioKilo: number): Promise<Empresa> {
        const empresa = new Empresa(nombre, ruc, logo, precioKilo);

        const uniqueData = await this._empresaRepository.empresaExists(empresa);
        EmpresaValidator.validateEmpresaData(uniqueData);

        const createdEmpresa = await this._empresaRepository.addEmpresa(empresa);
        return createdEmpresa;
    }

    public async editEmpresa(id: number, updatedData: Partial<Empresa>): Promise<Empresa> {
        const existingEmpresa = await EmpresaValidator.validateEmpresaExistsToEdition(this._empresaRepository, id);
        
        const uniqueData = await this._empresaRepository.empresaExists({ ...existingEmpresa, ...updatedData }, id);
        EmpresaValidator.validateEmpresaData(uniqueData);

        return await this._empresaRepository.editEmpresa(id, updatedData);
    }

    public async getAllEmpresas(): Promise<Empresa[]> {
        return await this._empresaRepository.getAllEmpresas();
    }

    public async getAllInactiveEmpresas(): Promise<Empresa[]> {
        return await this._empresaRepository.getAllInactiveEmpresas();
    }

    public async deactivateEmpresa(id: number): Promise<Empresa> {
        await EmpresaValidator.validateEmpresaExists(this._empresaRepository, id);
        return await this._empresaRepository.deactivateEmpresa(id);
    }

    public async activateEmpresa(id: number): Promise<Empresa> {
        await EmpresaValidator.validateEmpresaExists(this._empresaRepository, id);
        return await this._empresaRepository.activateEmpresa(id);
    }

    public async logicalEmpresaDeletion(id: number): Promise<Empresa> {
        await EmpresaValidator.validateEmpresaExistsToDeletion(this._empresaRepository, id);
        return await this._empresaRepository.logicalEmpresaDeletion(id);
    }
}
