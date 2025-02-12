import { User } from "../user";
//import { UniqueUserCheck } from "../types/unique-user-check.types";

export interface IUserRepository {
    //userExists(user: User, empresaId?: number): Promise<UniqueUserCheck>;

    getUserById(id: number): Promise<User | null>;
    addUser(user: User): Promise<User>;
    editUser(id: number, updateData: Partial<User>): Promise<User>;
    getAllUsers(): Promise<User[]>; // Activos y no eliminados
    getAllInActiveUsers(): Promise<User[]>; // Inactivos pero no eliminados
    deactivateUser(id: number): Promise<User>;
    activateUser(id: number): Promise<User>;
    logicalUserDeletion(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
}