import { IGroupRepository } from "../domain/interfaces/group.interface";
import { Group } from "../domain/entities/group";
import { GroupNotFound } from "../domain/exceptions/not-found.exception";
import { DeletedGroup } from "../domain/exceptions/deleted.exception";
import { ActiveGroup } from "../domain/exceptions/active.exception";
import { InactiveGroup } from "../domain/exceptions/inactive.exception";
import { NombreGroupExists } from "../domain/exceptions/group-data-exists.exception";

export class GroupService {
    private _groupRepository: IGroupRepository;

    constructor(groupRepository: IGroupRepository) {
        this._groupRepository = groupRepository;
    }

    public async getGroupById(id: number): Promise<Group> {
        const group = await this._groupRepository.getGroupById(id);

        if (!group)                 throw new GroupNotFound();
        if (group.isDeleted === 1)  throw new DeletedGroup();
        
        return group;
    }

    public async addGroup(nombre: string, color: string): Promise<Group> {
        const group = new Group(nombre, color);
        
        const validacionGrupo = await this._groupRepository.groupExists(group);
    
        if (validacionGrupo.nombreExists) throw new NombreGroupExists();
    
        return await this._groupRepository.addGroup(group);
    }

    public async editGroup(id: number, updatedData: Partial<Group>): Promise<Group> {
        const existingGroup = await this._groupRepository.getGroupById(id);
        
        if (!existingGroup)                  throw new GroupNotFound();
        if (existingGroup.status === false)  throw new InactiveGroup();
        if (existingGroup.isDeleted === 1)   throw new DeletedGroup();

        const validacionGroup = await this._groupRepository.groupExists({ ...existingGroup, ...updatedData }, id);
                
        if (validacionGroup.nombreExists)    throw new NombreGroupExists();
        
        const updatedGroup = await this._groupRepository.editGroup(id, updatedData);
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
        const existingGroup = await this._groupRepository.getGroupById(id);

        if (!existingGroup)                throw new GroupNotFound();
        if (existingGroup.isDeleted === 1) throw new DeletedGroup();

        const group = await this._groupRepository.deactivateGroup(id);
        return group;
    }

    public async activateGroup(id: number): Promise<Group> {
        const existingGroup = await this._groupRepository.getGroupById(id);

        if (!existingGroup)                throw new GroupNotFound();
        if (existingGroup.isDeleted === 1) throw new DeletedGroup();

        const group = await this._groupRepository.activateGroup(id);
        return group;
    }

    public async logicalGroupDeletion(id: number): Promise<Group> {
        const existingGroup = await this._groupRepository.getGroupById(id);

        if(!existingGroup)                  throw new GroupNotFound();
        if(!existingGroup.status === true)  throw new ActiveGroup();

        const group = await this._groupRepository.logicalGroupDeletion(id);
        return group;
    }
}
