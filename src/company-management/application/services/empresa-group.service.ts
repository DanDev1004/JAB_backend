import { IEmpresaGroupRepository } from "../../domain/interfaces/empresa-group.interface";
import { EmpresaGroup } from "../../domain/entities/empresa-group";
import { EmpresaGroupValidator } from "../validators/empresa-group.validator";

export class EmpresaGroupService {
    private _empresaGroupRepository: IEmpresaGroupRepository;

    constructor(empresaGroupRepository: IEmpresaGroupRepository) {
        this._empresaGroupRepository = empresaGroupRepository;
    }

    public async getEmpresaGroupById(id: number): Promise<EmpresaGroup> {
        return await EmpresaGroupValidator.validateEmpresaGroupExists(this._empresaGroupRepository, id);
    }

    public async addEmpresaGroup(empresaId: number, groupId: number | null): Promise<EmpresaGroup> {
        await EmpresaGroupValidator.validateEmpresaGroupRelation(this._empresaGroupRepository, empresaId, groupId);

        const empresaGroup = new EmpresaGroup(empresaId, groupId);
        return await this._empresaGroupRepository.addEmpresaGroup(empresaGroup);
    }

    public async editEmpresaGroup(id: number, updatedData: Partial<EmpresaGroup>): Promise<EmpresaGroup> {
        const existingEmpresaGroup = await EmpresaGroupValidator.validateEmpresaGroupExistsToEdition(this._empresaGroupRepository, id);
        
        if (updatedData.empresaId !== undefined || updatedData.groupId !== undefined) {
            await EmpresaGroupValidator.validateEmpresaGroupRelation(
                this._empresaGroupRepository,
                updatedData.empresaId ?? existingEmpresaGroup.empresaId,
                updatedData.groupId ?? null
            );
        }

        return await this._empresaGroupRepository.editEmpresaGroup(id, updatedData);
    }

    public async getAllEmpresaGroups(): Promise<EmpresaGroup[]> {
        return await this._empresaGroupRepository.getAllEmpresaGroups();
    }

    public async getAllInactiveEmpresaGroups(): Promise<EmpresaGroup[]> {
        return await this._empresaGroupRepository.getAllInactiveEmpresaGroups();
    }

    public async deactivateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        await EmpresaGroupValidator.validateEmpresaGroupExists(this._empresaGroupRepository, id);
        return await this._empresaGroupRepository.deactivateEmpresaGroup(id);
    }

    public async activateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        await EmpresaGroupValidator.validateEmpresaGroupExists(this._empresaGroupRepository, id);
        return await this._empresaGroupRepository.activateEmpresaGroup(id);
    }

    public async logicalEmpresaGroupDeletion(id: number): Promise<EmpresaGroup> {
        await EmpresaGroupValidator.validateEmpresaGroupExistsToDeletion(this._empresaGroupRepository, id);
        return await this._empresaGroupRepository.logicalEmpresaGroupDeletion(id);
    }
}
