import prisma from "../../../prisma";
import { IGroupRepository } from "../domain/interfaces/group.interface";
import { Group } from "../domain/group";
import { GroupNotFound } from "../domain/exceptions/not-found.exception";
import { GroupDeleted } from "../domain/exceptions/deleted.exception";
import { validateGroupUniqueness } from "./utils/validate-group-uniquess";
import { GroupActive } from "../domain/exceptions/active.exception";

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

    async getGroupById(id: number): Promise<Group> {
        const group = await prisma.group.findFirst({
            where: {
                groupId: id
            }
        });

        if (!group) {
            throw new GroupNotFound();
        }

        if (group.isDeleted === 1) {
            throw new GroupDeleted();
        }

        return group;
    }

    async editGroup(id: number, updatedData: Partial<Group>): Promise<Group> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });

        if (!existingGroup) {
            throw new GroupNotFound(); 
        }

        if (existingGroup.isDeleted === 1) {
            throw new GroupDeleted();
        }

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

    async deactivateGroup(id: number): Promise<Group> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });
    
        if (!existingGroup) {
            throw new GroupNotFound();
        }
    
        if (existingGroup.isDeleted === 1) {
            throw new GroupDeleted();
        }
    
        const deactivatedGroup = await prisma.group.update({
            where: { groupId: id },
            data: {
                status: false, 
                updatedAt: new Date() 
            }
        });
    
        return deactivatedGroup;
    }

    async activateGroup(id: number): Promise<Group> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });
    
        if (!existingGroup) {
            throw new GroupNotFound();
        }
    
        if (existingGroup.isDeleted === 1) {
            throw new GroupDeleted();
        }
    
        const activatedGroup = await prisma.group.update({
            where: { groupId: id },
            data: {
                status: true, 
                updatedAt: new Date() 
            }
        });
    
        return activatedGroup;
    }

    async logicalGroupDeletion(id: number): Promise<Group> {
        const existingGroup = await prisma.group.findUnique({
            where: { groupId: id }
        });
    
        if (!existingGroup) {
            throw new GroupNotFound();
        }
    
        if (existingGroup.status === true) {
            throw new GroupActive();
        }
    
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
