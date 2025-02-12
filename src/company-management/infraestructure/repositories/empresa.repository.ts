import prisma from "../../../../prisma";
import { Empresa } from "../../domain/entities/empresa";
import { IEmpresaRepository } from "../../domain/interfaces/empresa.interface";
import { UniqueEmpresaCheck } from "../../domain/types/unique-empresa-check.types";


export class EmpresaRepositoryPrismaMysql implements IEmpresaRepository {
    
    async empresaExists(empresa: Empresa, empresaId?: number): Promise<UniqueEmpresaCheck>{
        const existingEmpresa = await prisma.empresa.findFirst({
            where: {
                OR: [
                    { nombre: empresa.nombre, isDeleted: 0 },
                    { ruc: empresa.ruc, isDeleted: 0 }
                ],
                NOT: { empresaId: empresaId }
            }
        });
    
        return {
            nombreExists: existingEmpresa?.nombre === empresa.nombre,
            rucExists: existingEmpresa?.ruc === empresa.ruc
        };
    }

    async getEmpresaById(id: number): Promise<Empresa | null> {
        const empresa = await prisma.empresa.findUnique({
            where: { empresaId: id }
        });

        return empresa;
    }
    
    async addEmpresa(empresa: Empresa): Promise<Empresa> {
        const newEmpresa = await prisma.empresa.create({
            data: {
                nombre: empresa.nombre,
                ruc: empresa.ruc,
                logo: empresa.logo,
                precioPorKilo: empresa.precioPorKilo,
                status: true,
                isDeleted: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        return newEmpresa;
    }

    async editEmpresa(id: number, updatedData: Partial<Empresa>): Promise<Empresa> {
        const updatedEmpresa = await prisma.empresa.update({
            where: { empresaId: id },
            data: {
                ...updatedData,
                updatedAt: new Date()
            }
        });

        return updatedEmpresa;
    }

    async getAllEmpresas(): Promise<Empresa[]> {
        return await prisma.empresa.findMany({
            where: { status: true, isDeleted: 0 }
        });
    }

    async getAllInactiveEmpresas(): Promise<Empresa[]> {
        return await prisma.empresa.findMany({
            where: { status: false, isDeleted: 0 }
        });
    }

    async deactivateEmpresa(id: number): Promise<Empresa> {
        return await prisma.empresa.update({
            where: { empresaId: id },
            data: { status: false, updatedAt: new Date() }
        });
    }

    async activateEmpresa(id: number): Promise<Empresa> {
        return await prisma.empresa.update({
            where: { empresaId: id },
            data: { status: true, updatedAt: new Date() }
        });
    }

    async logicalEmpresaDeletion(id: number): Promise<Empresa> {
        return await prisma.empresa.update({
            where: { empresaId: id },
            data: { isDeleted: 1, updatedAt: new Date() }
        });
    }
}
