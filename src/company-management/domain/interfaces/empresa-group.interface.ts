import { EmpresaGroup } from "../empresa-group";

export interface IEmpresaGroupRepository {
    addEmpresaGroup(empresaGroup: EmpresaGroup): Promise<EmpresaGroup>;
    getEmpresaGroupById(id: number): Promise<EmpresaGroup>;
    editEmpresaGroup(id: number, updateData: Partial<EmpresaGroup>): Promise<EmpresaGroup>;
    getAllEmpresaGroups(): Promise<EmpresaGroup[]>; // Activos y no eliminados
    getAllInactiveEmpresaGroups(): Promise<EmpresaGroup[]>; // Inactivos pero no eliminados
    deactivateEmpresaGroup(id: number): Promise<EmpresaGroup>;
    activateEmpresaGroup(id: number): Promise<EmpresaGroup>;
    logicalEmpresaGroupDeletion(id: number): Promise<EmpresaGroup>;
}
