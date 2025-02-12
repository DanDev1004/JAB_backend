import { IEmpresaGroupRepository } from "../../domain/interfaces/empresa-group.interface";
import { EmpresaGroup } from "../../domain/entities/empresa-group";
import { EmpresaGroupNotFound } from "../../domain/exceptions/not-found.exception";
import { DeletedEmpresaGroup } from "../../domain/exceptions/deleted.exception";
import { ActiveEmpresaGroup } from "../../domain/exceptions/active.exception";
import { InactiveEmpresaGroup } from "../../domain/exceptions/inactive.exception";
import { relationExists } from "../../domain/exceptions/empresa-group-exists.exception";

export class EmpresaGroupService {
    private _empresaGroupRepository: IEmpresaGroupRepository;

    constructor(empresaGroupRepository: IEmpresaGroupRepository) {
        this._empresaGroupRepository = empresaGroupRepository;
    }

    public async getEmpresaGroupById(id: number): Promise<EmpresaGroup> {
        const empresaGroup = await this._empresaGroupRepository.getEmpresaGroupById(id);

        if (!empresaGroup) throw new EmpresaGroupNotFound();
        if (empresaGroup.isDeleted === 1) throw new DeletedEmpresaGroup();

        return empresaGroup;
    }

    public async addEmpresaGroup(empresaId: number, groupId: number | null): Promise<EmpresaGroup> {
        const empresaGroup = new EmpresaGroup(empresaId, groupId);

        const relacionExistente = await this._empresaGroupRepository.empresaGroupExists(empresaId, groupId);
        if (relacionExistente) throw new relationExists();

        const createdEmpresaGroup = await this._empresaGroupRepository.addEmpresaGroup(empresaGroup);
        return createdEmpresaGroup;
    }

    public async editEmpresaGroup(id: number, updatedData: Partial<EmpresaGroup>): Promise<EmpresaGroup> {
        const existingEmpresaGroup = await this._empresaGroupRepository.getEmpresaGroupById(id);

        if (!existingEmpresaGroup) throw new EmpresaGroupNotFound();
        if (existingEmpresaGroup.status === false) throw new InactiveEmpresaGroup();
        if (existingEmpresaGroup.isDeleted === 1) throw new DeletedEmpresaGroup();

        if (updatedData.empresaId !== undefined || updatedData.groupId !== undefined) {
            const exists = await this._empresaGroupRepository.empresaGroupExists(
                updatedData.empresaId ?? existingEmpresaGroup.empresaId,
                updatedData.groupId ?? null
            );
        
        if (exists) throw new relationExists();
    }

        const updatedEmpresaGroup = await this._empresaGroupRepository.editEmpresaGroup(id, updatedData);
        return updatedEmpresaGroup;
    }

    public async getAllEmpresaGroups(): Promise<EmpresaGroup[]> {
        return await this._empresaGroupRepository.getAllEmpresaGroups();
    }

    public async getAllInactiveEmpresaGroups(): Promise<EmpresaGroup[]> {
        return await this._empresaGroupRepository.getAllInactiveEmpresaGroups();
    }

    public async deactivateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        const existingEmpresaGroup = await this._empresaGroupRepository.getEmpresaGroupById(id);

        if (!existingEmpresaGroup) throw new EmpresaGroupNotFound();
        if (existingEmpresaGroup.isDeleted === 1) throw new DeletedEmpresaGroup();

        const empresaGroup = await this._empresaGroupRepository.deactivateEmpresaGroup(id);
        return empresaGroup;
    }

    public async activateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        const existingEmpresaGroup = await this._empresaGroupRepository.getEmpresaGroupById(id);

        if (!existingEmpresaGroup) throw new EmpresaGroupNotFound();
        if (existingEmpresaGroup.isDeleted === 1) throw new DeletedEmpresaGroup();

        const empresaGroup = await this._empresaGroupRepository.activateEmpresaGroup(id);
        return empresaGroup;
    }

    public async logicalEmpresaGroupDeletion(id: number): Promise<EmpresaGroup> {
        const existingEmpresaGroup = await this._empresaGroupRepository.getEmpresaGroupById(id);

        if (!existingEmpresaGroup) throw new EmpresaGroupNotFound();
        if (existingEmpresaGroup.status === true) throw new ActiveEmpresaGroup();

        const empresaGroup = await this._empresaGroupRepository.logicalEmpresaGroupDeletion(id);
        return empresaGroup;
    }
}
