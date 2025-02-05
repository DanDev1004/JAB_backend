import { Group } from "../group";

export interface IGroupRepository {
    addGroup(group: Group): Promise<Group>;
    getGroupById(id: number): Promise<Group | null>;
    editGroup(id: number, updateData: Partial<Group>): Promise<Group | 'NOT_FOUND' | 'DELETED'>;
    getAllGroups(): Promise<Group[]>; // Activos y no eliminados
    getAllInactiveGroups(): Promise<Group[]>; // Inactivos pero no eliminados
    deactivateGroup(id: number): Promise<Group | 'NOT_FOUND' | 'DELETED'>;
    activateGroup(id: number): Promise<Group | 'NOT_FOUND' | 'DELETED'>;
    logicalGroupDeletion(id: number): Promise<Group | 'NOT_FOUND' | 'ACTIVE'>;
}