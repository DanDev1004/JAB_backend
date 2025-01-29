import prisma from "../../../../prisma";
import { User } from "../../domain/user";
import { DniExists, EmailExists, PhoneExists } from "../../domain/exceptions/data-exists.exception";

export async function validateUserUniqueness(user: User, userId?: number): Promise<void> {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { DNI: user.DNI, isDeleted: 0 },
                { telefono: user.telefono, isDeleted: 0 },
                { email: user.email, isDeleted: 0 }
            ],
            NOT: {
                userId: userId
            }
        }
    });

    if (existingUser) {
        if (existingUser.DNI === user.DNI) {
            throw new DniExists();
        }
        if (existingUser.telefono === user.telefono) {
            throw new PhoneExists();
        }
        if (existingUser.email === user.email) {
            throw new EmailExists();
        }
    }
}
