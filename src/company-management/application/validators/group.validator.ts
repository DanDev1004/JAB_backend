import { IGroupRepository } from "../../domain/interfaces/group.interface";
import { Group } from "../../domain/entities/group";
import { GroupNotFound } from "../../domain/exceptions/not-found.exception";
import { DeletedGroup } from "../../domain/exceptions/deleted.exception";
import { ActiveGroup } from "../../domain/exceptions/active.exception";
import { InactiveGroup } from "../../domain/exceptions/inactive.exception";
import { NombreGroupExists } from "../../domain/exceptions/group-data-exists.exception";
import { UniqueGroupCheck } from "../../domain/types/unique-group-check.types";

export class GroupValidator {
    static async validateGroupExists(
        groupRepository: IGroupRepository,
        id: number
    ): Promise<Group> {
        const group = await groupRepository.getGroupById(id);
        
        if (!group)                 throw new GroupNotFound();
        if (group.isDeleted === 1)  throw new DeletedGroup();

        return group;
    }

    static async validateGroupExistsToEdition(
        groupRepository: IGroupRepository,
        id: number
    ): Promise<Group> {
        const group = await this.validateGroupExists(groupRepository, id);
        if (group.status === false) throw new InactiveGroup();

        return group;
    }

    static async validateGroupExistsToDeletion(
        groupRepository: IGroupRepository,
        id: number
    ): Promise<Group> {
        const group = await this.validateGroupExists(groupRepository, id);
        if (group.status === true)  throw new ActiveGroup();

        return group;
    }

    static validateGroupData(validacionGrupo: UniqueGroupCheck) {
        if (validacionGrupo.nombreExists) throw new NombreGroupExists();
    }
}
