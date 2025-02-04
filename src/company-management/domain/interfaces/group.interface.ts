import { Group } from "../group";

export interface IGroupRepository {
    addGroup(group: Group): Promise<Group>;
    getGroupById(id: number): Promise<Group>;
    editGroup(id: number, updateData: Partial<Group>): Promise<Group>;
    getAllGroups(): Promise<Group[]>; // Activos y no eliminados
    getAllInactiveGroups(): Promise<Group[]>; // Inactivos pero no eliminados
    deactivateGroup(id: number): Promise<Group>;
    activateGroup(id: number): Promise<Group>;
    logicalGroupDeletion(id: number): Promise<Group>;
}