import prisma from "../../../prisma";
import { Group } from "../domain/group";
import { IGroupRepository } from "../domain/interfaces/group.interface";
import { validateGroupUniqueness } from "./utils/validate-group-uniquess";

export class GroupRepositoryPrismaMysql implements IGroupRepository {

    async addGroup(group: Group): Promise<Group> {
        await validateGroupUniqueness(group);

        const newGroup = await prisma.group.create({
            data: {
                nombre: group.nombre,
                color: group.color,
                status: true,
                isDeleted: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return newGroup;
    }

    async getGroupById(id: number): Promise<Group | null> {
        const group = await prisma.group.findFirst({
            where: {
                groupId: id
            }
        });
        return group;
    }

    async editGroup(id: number, updatedData: Partial<Group>): Promise<Group | 'NOT_FOUND' | 'DELETED'> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });

        if (!existingGroup)                 return 'NOT_FOUND';
        if (existingGroup.isDeleted === 1)  return 'DELETED';

        await validateGroupUniqueness({...existingGroup, ...updatedData}, id);

        const updatedGroup = await prisma.group.update({
            where: { groupId: id },
            data: {
                ...updatedData,
                updatedAt: new Date()
            }
        });

        return updatedGroup;
    }

    async getAllGroups(): Promise<Group[]> {
        const groups = await prisma.group.findMany({
            where: {
                status: true,
                isDeleted: 0 
            }
        });

        return groups;
    }

    async getAllInactiveGroups(): Promise<Group[]> {
        const inactiveGroups = await prisma.group.findMany({
            where: {
                status: false,
                isDeleted: 0
            }
        });

        return inactiveGroups;
    }

    async deactivateGroup(id: number): Promise<Group | 'NOT_FOUND' | 'DELETED'> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });
    
        if (!existingGroup)                 return 'NOT_FOUND';
        if (existingGroup.isDeleted === 1)  return 'DELETED';
    
        const deactivatedGroup = await prisma.group.update({
            where: { groupId: id },
            data: {
                status: false, 
                updatedAt: new Date() 
            }
        });
    
        return deactivatedGroup;
    }

    async activateGroup(id: number): Promise<Group | 'NOT_FOUND' | 'DELETED'> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });
    
        if (!existingGroup)                 return 'NOT_FOUND';
        if (existingGroup.isDeleted === 1)  return 'DELETED';
    
        const activatedGroup = await prisma.group.update({
            where: { groupId: id },
            data: {
                status: true, 
                updatedAt: new Date() 
            }
        });
    
        return activatedGroup;
    }

    async logicalGroupDeletion(id: number): Promise<Group | 'NOT_FOUND' | 'ACTIVE'> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });
    
        if (!existingGroup)                 return 'NOT_FOUND';
        if (existingGroup.status === true)  return 'ACTIVE';
    
        const deletionGroup = await prisma.group.update({
            where: { groupId: id },
            data: {
                isDeleted: 1, 
                updatedAt: new Date() 
            }
        });
    
        return deletionGroup;
    }
}
