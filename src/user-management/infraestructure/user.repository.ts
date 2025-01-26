import prisma from "../../../prisma";
import { IUserRepository } from "../domain/interfaces/user.interface";
import { User } from "../domain/user";
import { UserNotFound } from "../domain/exceptions/user-not-found.exception";
import { UserDeleted } from "../domain/exceptions/user-deleted.exception";
import { validateUserUniqueness } from "./utils/validate-user-uniquess";

export class UserRepositoryPrismaMysql implements IUserRepository {
    async addUser(user: User): Promise<User> {
        await validateUserUniqueness(user);

        const newUser = await prisma.user.create({
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

        return newUser;
    }

    async getUserById(id: number): Promise<User> {

        const user = await prisma.user.findFirst({
            where: {
                userId: id
            }
        });

        if (!user) {
            throw new UserNotFound();
        }

        if (user.isDeleted === 1) {
            throw new UserDeleted();
        }

        return user;
    }

    async editUser(id: number, updatedData: Partial<User>): Promise<User> {

        const existingUser = await prisma.user.findUnique({
            where: { userId: id }
        });

        if (!existingUser) {
            throw new UserNotFound(); 
        }

        if (existingUser.isDeleted === 1) {
            throw new UserDeleted();
        }

        await validateUserUniqueness({...existingUser, ...updatedData}, id);

        

        const updatedUser = await prisma.user.update({
            where: { userId: id },
            data: {
                ...updatedData,
                updatedAt: new Date()
            }
        });

        return updatedUser;
    }

    async getAllUsers(): Promise<User[]> {
        const activeUsers = await prisma.user.findMany({
            where: {
                status: true,
                isDeleted: 0 
            }
        });

        return activeUsers;
    }
}

