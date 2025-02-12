import prisma from "../../../prisma";
import { IUserRepository } from "../domain/interfaces/user.interface";
import { User } from "../domain/user";
import { UniqueUserCheck } from "../domain/types/unique-user-check.types";

export class UserRepositoryPrismaMysql implements IUserRepository {

    async userExists(user: User, userId?: number): Promise<UniqueUserCheck> {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { DNI: user.DNI, isDeleted: 0 },
                    { email: user.email, isDeleted: 0 },
                    { telefono: user.telefono, isDeleted: 0 }
                ],
                NOT: { userId: userId }
            }
        });

        return {
            DNIExists: existingUser?.DNI === user.DNI,
            emailExists: existingUser?.email === user.email,
            telefonoExists: existingUser?.telefono === user.telefono
        }
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                userId: id
            }
        });
        return user;
    }

    async addUser(user: User): Promise<User> {
        return await prisma.user.create({
            data: {
                DNI: user.DNI,
                nombres: user.nombres,
                email: user.email,
                telefono: user.telefono,
                password: user.password,
                status: true,
                rol: user.rol,
                isDeleted: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    }

    async editUser(id: number, updatedData: Partial<User>): Promise<User> {
        return await prisma.user.update({
            where: { userId: id },
            data: {
                ...updatedData,
                updatedAt: new Date()
            }
        });
    }

    async getAllUsers(): Promise<User[]> {
        return await prisma.user.findMany({
            where: {
                status: true,
                isDeleted: 0
            }
        });
    }

    async getAllInActiveUsers(): Promise<User[]> {
        return await prisma.user.findMany({
            where: {
                status: false,
                isDeleted: 0
            }
        });
    }

    async deactivateUser(id: number): Promise<User> {
        return await prisma.user.update({
            where: { userId: id },
            data: {
                status: false,
                updatedAt: new Date()
            }
        });
    }

    async activateUser(id: number): Promise<User> {
        return await prisma.user.update({
            where: { userId: id },
            data: {
                status: true,
                updatedAt: new Date()
            }
        });
    }

    async logicalUserDeletion(id: number): Promise<User> {
        return await prisma.user.update({
            where: { userId: id },
            data: {
                isDeleted: 1,
                updatedAt: new Date()
            }
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where: { email: email }
        });
    }

}

