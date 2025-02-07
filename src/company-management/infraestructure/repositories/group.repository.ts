import prisma from "../../../../prisma";
import { Group } from "../../domain/entities/group";
import { IGroupRepository } from "../../domain/interfaces/group.interface";
import { UniqueGroupCheck } from "../../domain/types/unique-group-check.types";

export class GroupRepositoryPrismaMysql implements IGroupRepository {

    async groupExists(group: Group, groupId?: number): Promise<UniqueGroupCheck>{
        const existingGroup = await prisma.group.findFirst({
            where: {
                OR: [
                    { nombre: group.nombre, isDeleted: 0 },
                ],
                NOT: { groupId: groupId }
            }
        });
    
        return {
            nombreExists: existingGroup?.nombre === group.nombre,
        };
    }

    async getGroupById(id: number): Promise<Group | null> {
        const group = await prisma.group.findUnique({
            where: {groupId: id}
        });
        return group;
    }

    async addGroup(group: Group): Promise<Group> {
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


    async editGroup(id: number, updatedData: Partial<Group>): Promise<Group> {
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
