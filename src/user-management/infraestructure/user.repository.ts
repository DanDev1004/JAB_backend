import prisma from "../../../prisma";
import { IUserRepository } from "../domain/interfaces/user.interface";
import { User } from "../domain/user";
import { validateUserUniqueness } from "./validate-user-uniquess";

export class UserRepositoryPrismaMysql implements IUserRepository {
    public async addUser(user: User): Promise<User> {
        await validateUserUniqueness(user);

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
}
