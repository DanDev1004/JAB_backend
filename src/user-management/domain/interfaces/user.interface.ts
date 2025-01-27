import { User } from "../user";

export interface IUserRepository {
    addUser(user: User): Promise<User>;
    getUserById(id: number): Promise<User>;
    editUser(id: number, updateData: Partial<User>): Promise<User>;
    getAllUsers(): Promise<User[]>; // Activos y no eliminados
    getAllInActiveUsers(): Promise<User[]>; // Inactivos pero no eliminados
    deactivateUser(id: number): Promise<User>;
    activateUser(id: number): Promise<User>;
    logicalUserDeletion(id: number): Promise<User>;
}