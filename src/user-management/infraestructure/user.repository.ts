import prisma from "../../../prisma";
import { IUserRepository } from "../domain/interfaces/user.interface";
import { User } from "../domain/user";
import { UserNotFound } from "../domain/exceptions/not-found.exception";
import { DeletedUser } from "../domain/exceptions/deleted.exception";
import { validateUserUniqueness } from "./utils/validate-user-uniqueness";
import { ActiveUser } from "../domain/exceptions/active.exception";
import { InactiveUser } from "../domain/exceptions/inactive.exception";

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
            throw new DeletedUser();
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
            throw new DeletedUser();
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
        const Users = await prisma.user.findMany({
            where: {
                status: true,
                isDeleted: 0 
            }
        });

        return Users;
    }

    async getAllInActiveUsers(): Promise<User[]>{
        const inativeUsers = await prisma.user.findMany({
            where: {
                status: false,
                isDeleted: 0
            }
        });

        return inativeUsers;
    }

    async deactivateUser(id: number): Promise<User> {
        const existingUser = await prisma.user.findUnique({
            where: { userId: id }
        });
    
        if (!existingUser) {
            throw new UserNotFound();
        }
    
        if (existingUser.isDeleted === 1) {
            throw new DeletedUser();
        }
    
        const deactivatedUser = await prisma.user.update({
            where: { userId: id },
            data: {
                status: false, 
                updatedAt: new Date() 
            }
        });
    
        return deactivatedUser;
    }

    async activateUser(id: number): Promise<User> {
        const existingUser = await prisma.user.findUnique({
            where: { userId: id }
        });
    
        if (!existingUser) {
            throw new UserNotFound();
        }
    
        if (existingUser.isDeleted === 1) {
            throw new DeletedUser();
        }
    
        const activateUser = await prisma.user.update({
            where: { userId: id },
            data: {
                status: true, 
                updatedAt: new Date() 
            }
        });
    
        return activateUser;
    }

    async logicalUserDeletion(id: number): Promise<User> {
        const existingUser = await prisma.user.findUnique({
            where: { userId: id }
        });
    
        if (!existingUser) {
            throw new UserNotFound();
        }
    
        if (existingUser.status === true) {
            throw new ActiveUser();
        }
    
        const deletionUser = await prisma.user.update({
            where: { userId: id },
            data: {
                isDeleted: 1, 
                updatedAt: new Date() 
            }
        });
    
        return deletionUser;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
    
        if (!user) {
            throw new UserNotFound();
        }

        if (user.status === false){
            throw new InactiveUser();
        }
    
        if (user.isDeleted === 1) {
            throw new DeletedUser();
        }
    
        return user;
    }
    
}

