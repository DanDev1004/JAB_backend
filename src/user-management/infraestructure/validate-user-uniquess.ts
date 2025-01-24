import prisma from "../../../prisma";
import { User } from "../domain/user";

export async function validateUserUniqueness(user: User): Promise<void> {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { DNI: user.DNI, isDeleted: 0 },
                { telefono: user.telefono, isDeleted: 0 },
                { email: user.email, isDeleted: 0 }
            ]
        }
    });

    if (existingUser) {
        if (existingUser.DNI === user.DNI) {
            throw new Error("El DNI ya está registrado.");
        }
        if (existingUser.telefono === user.telefono) {
            throw new Error("El teléfono ya está registrado.");
        }
        if (existingUser.email === user.email) {
            throw new Error("El email ya está registrado.");
        }
    }
}
