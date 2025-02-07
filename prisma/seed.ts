import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminHashedPassword = await bcrypt.hash('Admin1234*', 10);
    const userHashedPassword = await bcrypt.hash('User1234*', 10);

    const existingUser = await prisma.user.findFirst({
        where: { email: 'admin@example.com' }
    });

    if (!existingUser) {
        await prisma.user.create({
            data: {
                DNI: '12345678',
                nombres: 'Admin UserTest',
                email: 'admin@example.com',
                telefono: '999999999',
                password: adminHashedPassword,
                status: true,
                rol: 'admin',
                isDeleted: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
    }
    console.log('✅ Usuario de prueba creado correctamente.');


    if (!existingUser) {
        await prisma.user.create({
            data: {
                DNI: '87654321',
                nombres: 'Regular User',
                email: 'user@example.com',
                telefono: '888888888',
                password: userHashedPassword,
                status: true,
                rol: 'user',
                isDeleted: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        console.log('✅ Usuario regular creado correctamente.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
