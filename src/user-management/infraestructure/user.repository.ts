import prisma from "../../../prisma";
import { IUserRepository } from "../domain/interfaces/user.interface";
import { User } from "../domain/user";
import { UserNotFound } from "../domain/exceptions/user-not-found.exception";
import { UserDeleted } from "../domain/exceptions/user-deleted.exception";
import { validateUserUniqueness } from "./validate-user-uniquess";

export class UserRepositoryPrismaMysql implements IUserRepository {
    public async addUser(user: User): Promise<User> {
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

    public async getUserById(id: number): Promise<User> {

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
}

