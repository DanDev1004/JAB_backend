import { Group } from "../entities/group";
import { UniqueGroupCheck } from "../types/unique-group-check.types";

export interface IGroupRepository {
    groupExists(empresa: Group, empresaId?: number): Promise<UniqueGroupCheck>;

    getGroupById(id: number): Promise<Group | null>;
    addGroup(group: Group): Promise<Group>;
    editGroup(id: number, updateData: Partial<Group>): Promise<Group>;
    getAllGroups(): Promise<Group[]>; 
    getAllInactiveGroups(): Promise<Group[]>; 
    deactivateGroup(id: number): Promise<Group>;
    activateGroup(id: number): Promise<Group>;
    logicalGroupDeletion(id: number): Promise<Group>;
}