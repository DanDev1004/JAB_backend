import { Empresa } from "../empresa";

export interface IEmpresaRepository {
    addEmpresa(empresa: Empresa): Promise<Empresa>;
    getEmpresaById(id: number): Promise<Empresa>;
    editEmpresa(id: number, updateData: Partial<Empresa>): Promise<Empresa>;
    getAllEmpresas(): Promise<Empresa[]>; // Activas y no eliminadas
    getAllInactiveEmpresas(): Promise<Empresa[]>; // Inactivas pero no eliminadas
    deactivateEmpresa(id: number): Promise<Empresa>;
    activateEmpresa(id: number): Promise<Empresa>;
    logicalEmpresaDeletion(id: number): Promise<Empresa>;
}
