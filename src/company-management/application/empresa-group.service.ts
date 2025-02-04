import { IEmpresaGroupRepository } from "../domain/interfaces/empresa-group.interface";
import { EmpresaGroup } from "../domain/empresa-group";
import { EmpresaGroupNotFound } from "../domain/exceptions/not-found.exception";

export class EmpresaGroupService {
    private _empresaGroupRepository: IEmpresaGroupRepository;

    constructor(empresaGroupRepository: IEmpresaGroupRepository) {
        this._empresaGroupRepository = empresaGroupRepository;
    }

    public async addEmpresaGroup(empresaId: number, groupId: number | null): Promise<EmpresaGroup> {
        const empresaGroup = new EmpresaGroup(empresaId, groupId);
        const createdEmpresaGroup = await this._empresaGroupRepository.addEmpresaGroup(empresaGroup);
        return createdEmpresaGroup;
    }

    public async getEmpresaGroupById(id: number): Promise<EmpresaGroup> {
        const empresaGroup = await this._empresaGroupRepository.getEmpresaGroupById(id);
        if (!empresaGroup) {
            throw new EmpresaGroupNotFound();
        }
        return empresaGroup;
    }

    public async editEmpresaGroup(id: number, updatedData: Partial<EmpresaGroup>): Promise<EmpresaGroup> {
        const updatedEmpresaGroup = await this._empresaGroupRepository.editEmpresaGroup(id, updatedData);
        if (!updatedEmpresaGroup) {
            throw new EmpresaGroupNotFound();
        }
        return updatedEmpresaGroup;
    }

    public async getAllEmpresaGroups(): Promise<EmpresaGroup[]> {
        const activeEmpresaGroups = await this._empresaGroupRepository.getAllEmpresaGroups();
        return activeEmpresaGroups;
    }

    public async getAllInactiveEmpresaGroups(): Promise<EmpresaGroup[]> {
        const inactiveEmpresaGroups = await this._empresaGroupRepository.getAllInactiveEmpresaGroups();
        return inactiveEmpresaGroups;
    }

    public async deactivateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        const empresaGroup = await this._empresaGroupRepository.deactivateEmpresaGroup(id);
        if (!empresaGroup) {
            throw new EmpresaGroupNotFound();
        }
        return empresaGroup;
    }

    public async activateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        const empresaGroup = await this._empresaGroupRepository.activateEmpresaGroup(id);
        if (!empresaGroup) {
            throw new EmpresaGroupNotFound();
        }
        return empresaGroup;
    }

    public async logicalEmpresaGroupDeletion(id: number): Promise<EmpresaGroup> {
        const empresaGroup = await this._empresaGroupRepository.logicalEmpresaGroupDeletion(id);
        if (!empresaGroup) {
            throw new EmpresaGroupNotFound();
        }
        return empresaGroup;
    }
}
