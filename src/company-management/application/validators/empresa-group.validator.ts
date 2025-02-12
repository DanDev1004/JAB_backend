import { IEmpresaGroupRepository } from "../../domain/interfaces/empresa-group.interface";
import { EmpresaGroup } from "../../domain/entities/empresa-group";
import { EmpresaGroupNotFound } from "../../domain/exceptions/not-found.exception";
import { DeletedEmpresaGroup } from "../../domain/exceptions/deleted.exception";
import { ActiveEmpresaGroup } from "../../domain/exceptions/active.exception";
import { InactiveEmpresaGroup } from "../../domain/exceptions/inactive.exception";
import { relationExists } from "../../domain/exceptions/empresa-group-exists.exception";

export class EmpresaGroupValidator {
    static async validateEmpresaGroupExists(
        empresaGroupRepository: IEmpresaGroupRepository,
        id: number
    ): Promise<EmpresaGroup> {
        const empresaGroup = await empresaGroupRepository.getEmpresaGroupById(id);
        
        if (!empresaGroup)               throw new EmpresaGroupNotFound();
        if (empresaGroup.isDeleted === 1) throw new DeletedEmpresaGroup();

        return empresaGroup;
    }

    static async validateEmpresaGroupExistsToEdition(
        empresaGroupRepository: IEmpresaGroupRepository,
        id: number
    ): Promise<EmpresaGroup> {
        const empresaGroup = await this.validateEmpresaGroupExists(empresaGroupRepository, id);
        if (empresaGroup.status === false) throw new InactiveEmpresaGroup();

        return empresaGroup;
    }

    static async validateEmpresaGroupExistsToDeletion(
        empresaGroupRepository: IEmpresaGroupRepository,
        id: number
    ): Promise<EmpresaGroup> {
        const empresaGroup = await this.validateEmpresaGroupExists(empresaGroupRepository, id);
        if (empresaGroup.status === true) throw new ActiveEmpresaGroup();

        return empresaGroup;
    }

    static async validateEmpresaGroupRelation(
        empresaGroupRepository: IEmpresaGroupRepository,
        empresaId: number,
        groupId: number | null
    ) {
        const exists = await empresaGroupRepository.empresaGroupExists(empresaId, groupId);
        if (exists) throw new relationExists();
    }
}
