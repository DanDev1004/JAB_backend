import { EmpresaGroup } from "../entities/empresa-group";

export interface IEmpresaGroupRepository {
    empresaGroupExists(empresaId: number, groupId: number | null): Promise<boolean>;

    getEmpresaGroupById(id: number): Promise<EmpresaGroup | null>;
    addEmpresaGroup(empresaGroup: EmpresaGroup): Promise<EmpresaGroup>;
    editEmpresaGroup(id: number, updateData: Partial<EmpresaGroup>): Promise<EmpresaGroup>;
    getAllEmpresaGroups(): Promise<EmpresaGroup[]>; // Activos y no eliminados
    getAllInactiveEmpresaGroups(): Promise<EmpresaGroup[]>; // Inactivos pero no eliminados
    deactivateEmpresaGroup(id: number): Promise<EmpresaGroup>;
    activateEmpresaGroup(id: number): Promise<EmpresaGroup>;
    logicalEmpresaGroupDeletion(id: number): Promise<EmpresaGroup>;
}
