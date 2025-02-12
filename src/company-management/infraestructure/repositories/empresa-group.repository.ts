import prisma from "../../../../prisma";
import { EmpresaGroup } from "../../domain/entities/empresa-group";
import { IEmpresaGroupRepository } from "../../domain/interfaces/empresa-group.interface";

export class EmpresaGroupRepositoryPrismaMysql implements IEmpresaGroupRepository {
    
    async empresaGroupExists(empresaId: number, groupId: number | null): Promise<boolean> {
        const existingRelation = await prisma.empresa_Group.findFirst({
            where: {
                empresaId,
                groupId
            }
        });

        return !!existingRelation; 
    }

    async getEmpresaGroupById(id: number): Promise<EmpresaGroup | null> {
        return await prisma.empresa_Group.findUnique({
            where: { empresaGroupId: id }
        });
    }

    async addEmpresaGroup(empresaGroup: EmpresaGroup): Promise<EmpresaGroup> {
        return await prisma.empresa_Group.create({
            data: {
                empresaId: empresaGroup.empresaId,
                groupId: empresaGroup.groupId,
                status: true,
                isDeleted: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    }

    async editEmpresaGroup(id: number, updatedData: Partial<EmpresaGroup>): Promise<EmpresaGroup> {
        return await prisma.empresa_Group.update({
            where: { empresaGroupId: id },
            data: {
                ...updatedData,
                updatedAt: new Date()
            }
        });
    }

    async getAllEmpresaGroups(): Promise<EmpresaGroup[]> {
        return await prisma.empresa_Group.findMany({
            where: { status: true, isDeleted: 0 }
        });
    }

    async getAllInactiveEmpresaGroups(): Promise<EmpresaGroup[]> {
        return await prisma.empresa_Group.findMany({
            where: { status: false, isDeleted: 0 }
        });
    }

    async deactivateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        return await prisma.empresa_Group.update({
            where: { empresaGroupId: id },
            data: { status: false, updatedAt: new Date() }
        });
    }

    async activateEmpresaGroup(id: number): Promise<EmpresaGroup> {
        return await prisma.empresa_Group.update({
            where: { empresaGroupId: id },
            data: { status: true, updatedAt: new Date() }
        });
    }

    async logicalEmpresaGroupDeletion(id: number): Promise<EmpresaGroup> {
        return await prisma.empresa_Group.update({
            where: { empresaGroupId: id },
            data: { isDeleted: 1, updatedAt: new Date() }
        });
    }
}
