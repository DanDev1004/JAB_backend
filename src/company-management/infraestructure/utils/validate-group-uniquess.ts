import prisma from "../../../../prisma";
import { Group } from "../../domain/group";
import { NombreExists } from "../../domain/exceptions/group-data-exists.exception";

export async function validateGroupUniqueness(group: Group, groupId?: number): Promise<void> {
    const existingGroup = await prisma.group.findFirst({
        where: {
            OR: [
                { nombre: group.nombre, isDeleted: 0 }
            ],
            NOT: {
                groupId: groupId
            }
        }
    });

    if (existingGroup) {
        if (existingGroup.nombre === group.nombre) {
            throw new NombreExists();
        }
    }
}
