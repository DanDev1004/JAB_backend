import { Empresa } from "../entities/empresa";
import { UniqueEmpresaCheck } from "../types/unique-empresa-check.types";

export interface IEmpresaRepository {
    empresaExists(empresa: Empresa, empresaId?: number): Promise<UniqueEmpresaCheck>;
    
    getEmpresaById(id: number): Promise<Empresa | null>;
    addEmpresa(empresa: Empresa): Promise<Empresa>; 
    editEmpresa(id: number, updateData: Partial<Empresa>): Promise<Empresa>;
    getAllEmpresas(): Promise<Empresa[]>;
    getAllInactiveEmpresas(): Promise<Empresa[]>;
    deactivateEmpresa(id: number): Promise<Empresa>;
    activateEmpresa(id: number): Promise<Empresa>;
    logicalEmpresaDeletion(id: number): Promise<Empresa>;
}
