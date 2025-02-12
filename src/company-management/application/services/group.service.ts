import { IGroupRepository } from "../../domain/interfaces/group.interface";
import { Group } from "../../domain/entities/group";
import { GroupValidator } from "../validators/group.validator";

export class GroupService {
    private _groupRepository: IGroupRepository;

    constructor(groupRepository: IGroupRepository) {
        this._groupRepository = groupRepository;
    }

    public async getGroupById(id: number): Promise<Group> {
        return await GroupValidator.validateGroupExists(this._groupRepository, id);
    }

    public async addGroup(nombre: string, color: string): Promise<Group> {
        const group = new Group(nombre, color);
        
        const uniqueData = await this._groupRepository.groupExists(group);
        GroupValidator.validateGroupData(uniqueData);
    
        return await this._groupRepository.addGroup(group);
    }

    public async editGroup(id: number, updatedData: Partial<Group>): Promise<Group> {
        const existingGroup = await GroupValidator.validateGroupExistsToEdition(this._groupRepository, id);
        
        const uniqueData = await this._groupRepository.groupExists({ ...existingGroup, ...updatedData }, id);
        GroupValidator.validateGroupData(uniqueData);
        
        return await this._groupRepository.editGroup(id, updatedData);
    }

    public async getAllGroups(): Promise<Group[]> {
        return await this._groupRepository.getAllGroups();
    }

    public async getAllInactiveGroups(): Promise<Group[]> {
        return await this._groupRepository.getAllInactiveGroups();
    }

    public async deactivateGroup(id: number): Promise<Group> {
        await GroupValidator.validateGroupExists(this._groupRepository, id);
        return await this._groupRepository.deactivateGroup(id);
    }

    public async activateGroup(id: number): Promise<Group> {
        await GroupValidator.validateGroupExists(this._groupRepository, id);
        return await this._groupRepository.activateGroup(id);
    }

    public async logicalGroupDeletion(id: number): Promise<Group> {
        await GroupValidator.validateGroupExistsToDeletion(this._groupRepository, id);
        return await this._groupRepository.logicalGroupDeletion(id);
    }
}
