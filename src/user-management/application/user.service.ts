import { IUserRepository } from "../domain/interfaces/user.interface";
import { UserSpecificationRules } from "../domain/rules/user.specification.rules";
import { User, UserWithoutPassword } from "../domain/user";
import { IPasswordHasher } from "../domain/interfaces/password-hasher.interface";

export class UserService {
    private _userRepository: IUserRepository;
    private _passwordHasher: IPasswordHasher;

    constructor(
        userRepository: IUserRepository,
        passwordHasher: IPasswordHasher
    ) {
        this._userRepository = userRepository;
        this._passwordHasher = passwordHasher;
    }

    public async addUser(
        DNI: string,
        nombres: string,
        email: string,
        telefono: string,
        password: string,
        rol: string
    ): Promise<UserWithoutPassword> {

        UserSpecificationRules.validateDNI(DNI);
        UserSpecificationRules.validateTelefono(telefono);
        UserSpecificationRules.validateEmail(email);
        UserSpecificationRules.validatePassword(password);
        UserSpecificationRules.validateRole(rol);

        const hashedPassword = await this._passwordHasher.hash(password);

        const user: User = new User(
            DNI, nombres, email, telefono, hashedPassword, rol
        );

         const createdUser = await this._userRepository.addUser(user);

         const { password: _, ...userWithoutPassword } = createdUser;
 
         return userWithoutPassword;
    }

    public async getUserById(id: number): Promise<UserWithoutPassword> {
        const user = await this._userRepository.getUserById(id);

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    public async editUser( id: number, updatedData: Partial<User>): Promise<UserWithoutPassword> {
        if (updatedData.DNI) {
            UserSpecificationRules.validateDNI(updatedData.DNI);
        }
        if (updatedData.telefono) {
            UserSpecificationRules.validateTelefono(updatedData.telefono);
        }
        if (updatedData.email) {
            UserSpecificationRules.validateEmail(updatedData.email);
        }

        if (updatedData.password) {
            UserSpecificationRules.validatePassword(updatedData.password);
        }

        if (updatedData.rol) {
            UserSpecificationRules.validateRole(updatedData.rol);
        }

        if (updatedData.password) {
            updatedData.password = await this._passwordHasher.hash(updatedData.password);
        }

        const updatedUser = await this._userRepository.editUser(id, updatedData);

        const { password: _, ...userWithoutPassword } = updatedUser;

        return userWithoutPassword;
    }

    public async getAllUsers(): Promise<UserWithoutPassword[]> {
        const activeUsers = await this._userRepository.getAllUsers();

        const usersWithoutPassword = activeUsers.map(user => {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        return usersWithoutPassword;
    }

    public async getAllInActiveUsers(): Promise<UserWithoutPassword[]> {
        const inativeUsers = await this._userRepository.getAllInActiveUsers();

        const usersWithoutPassword = inativeUsers.map(user => {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        return usersWithoutPassword;
    }

    public async deactivateUser(id: number): Promise<UserWithoutPassword> {
        const user = await this._userRepository.deactivateUser(id);
    
        const { password: _, ...userWithoutPassword } = user;
    
        return userWithoutPassword;
    }

    public async activateUser(id: number): Promise<UserWithoutPassword> {
        const user = await this._userRepository.activateUser(id);
    
        const { password: _, ...userWithoutPassword } = user;
    
        return userWithoutPassword;
    }

    public async logicalUserDeletion(id: number): Promise<UserWithoutPassword> {
        const user = await this._userRepository.logicalUserDeletion(id);
    
        const { password: _, ...userWithoutPassword } = user;
    
        return userWithoutPassword;
    }

}