import { User } from "../user";

export interface IUserRepository {
    addUser(user: User): Promise<User>;
    getUserById(id: number): Promise<User>;
}