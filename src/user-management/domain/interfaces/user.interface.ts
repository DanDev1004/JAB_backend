import { User } from "../user";

export interface IUserRepository {
    addUser(user: User): Promise<User>;
}