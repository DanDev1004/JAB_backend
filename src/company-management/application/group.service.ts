import { IGroupRepository } from "../domain/interfaces/group.interface";
import { Group } from "../domain/group";
import { GroupNotFound } from "../domain/exceptions/not-found.exception";
import { GroupDeleted } from "../domain/exceptions/deleted.exception";
import { GroupActive } from "../domain/exceptions/active.exception";

export class GroupService {
    private _groupRepository: IGroupRepository;

    constructor(groupRepository: IGroupRepository) {
        this._groupRepository = groupRepository;
    }

    public async addGroup(nombre: string, color: string): Promise<Group> {
        const group = new Group(nombre, color);
        const createdGroup = await this._groupRepository.addGroup(group);
        
        return createdGroup;
    }

    public async getGroupById(id: number): Promise<Group> {
        const group = await this._groupRepository.getGroupById(id);

        if (!group)                 throw new GroupNotFound();
        if (group.isDeleted === 1)  throw new GroupDeleted();
        
        return group;
    }

    public async editGroup(id: number, updatedData: Partial<Group>): Promise<Group> {
        const updatedGroup = await this._groupRepository.editGroup(id, updatedData);
        
        if (updatedGroup === 'NOT_FOUND')   throw new GroupNotFound();
        if (updatedGroup === 'DELETED')     throw new GroupDeleted();

        return updatedGroup;
    }

    public async getAllGroups(): Promise<Group[]> {
        const activeGroups = await this._groupRepository.getAllGroups();
        return activeGroups;
    }

    public async getAllInactiveGroups(): Promise<Group[]> {
        const inactiveGroups = await this._groupRepository.getAllInactiveGroups();
        return inactiveGroups;
    }

    public async deactivateGroup(id: number): Promise<Group> {
        const group = await this._groupRepository.deactivateGroup(id);

        if (group === 'NOT_FOUND')  throw new GroupNotFound();
        if (group === 'DELETED')    throw new GroupDeleted();

        return group;
    }

    public async activateGroup(id: number): Promise<Group> {
        const group = await this._groupRepository.activateGroup(id);

        if (group === 'NOT_FOUND')  throw new GroupNotFound();
        if (group === 'DELETED')    throw new GroupDeleted();

        return group;
    }

    public async logicalGroupDeletion(id: number): Promise<Group> {
        const group = await this._groupRepository.logicalGroupDeletion(id);

        if (group === 'NOT_FOUND') throw new GroupNotFound();
        if (group === 'ACTIVE') throw new GroupActive();

        return group;
    }
}
