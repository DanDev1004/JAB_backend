import { IUserRepository } from "../../domain/interfaces/user.interface";
import { UserSpecificationRules } from "../../domain/rules/user.specification.rules";
import { User, UserWithoutPassword } from "../../domain/user";
import { IPasswordHasher } from "../../domain/interfaces/password-hasher.interface";
import { UserNotFound } from "../../domain/exceptions/not-found.exception";
import { DeletedUser } from "../../domain/exceptions/deleted.exception";
import { ActiveUser } from "../../domain/exceptions/active.exception";
import { DniExists, EmailExists, PhoneExists } from "../../domain/exceptions/user-data-exists.exception";

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

    public async getUserById(id: number): Promise<UserWithoutPassword> {
        const user = await this._userRepository.getUserById(id);

        if (!user) throw new UserNotFound();
        if (user.isDeleted === 1) throw new DeletedUser();

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    public async addUser(
        DNI: string,
        nombres: string,
        email: string,
        telefono: string,
        password: string,
        rol: string
    ): Promise<UserWithoutPassword> {
    
        // Validaciones de reglas del usuario
        UserSpecificationRules.validateDNI(DNI);
        UserSpecificationRules.validateTelefono(telefono);
        UserSpecificationRules.validateEmail(email);
        UserSpecificationRules.validatePassword(password);
        UserSpecificationRules.validateRole(rol);
    
        // Verificar si el usuario ya existe
        const user = new User(DNI, nombres, email, telefono, password, rol);
        const validacionUsuario = await this._userRepository.userExists(user);
    
        if (validacionUsuario.DNIExists)        throw new DniExists();
        if (validacionUsuario.emailExists)      throw new EmailExists();
        if (validacionUsuario.telefonoExists)   throw new PhoneExists();
    
        // Hashear la contraseña
        user.password = await this._passwordHasher.hash(password);
    
        const createdUser = await this._userRepository.addUser(user);
        const { password: _, ...userWithoutPassword } = createdUser;
    
        return userWithoutPassword;
    }

    public async editUser(id: number, updatedData: Partial<User>): Promise<UserWithoutPassword> {

        const existingUser = await this._userRepository.getUserById(id);
        if (!existingUser)                  throw new UserNotFound();
        if (existingUser.isDeleted === 1)   throw new DeletedUser();

        // Validar unicidad de los datos únicos (DNI, email, teléfono)
        const validacionUsuario = await this._userRepository.userExists({ ...existingUser, ...updatedData }, id);
        if (validacionUsuario.DNIExists)        throw new DniExists();
        if (validacionUsuario.emailExists)      throw new EmailExists();
        if (validacionUsuario.telefonoExists)   throw new PhoneExists();

        // Validaciones específicas del usuario
        if (updatedData.DNI)        UserSpecificationRules.validateDNI(updatedData.DNI);
        if (updatedData.telefono)   UserSpecificationRules.validateTelefono(updatedData.telefono);
        if (updatedData.email)      UserSpecificationRules.validateEmail(updatedData.email);
        if (updatedData.password)   UserSpecificationRules.validatePassword(updatedData.password);
        if (updatedData.rol)        UserSpecificationRules.validateRole(updatedData.rol);

        if (updatedData.password) updatedData.password = await this._passwordHasher.hash(updatedData.password);

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
        const existingUser = await this._userRepository.getUserById(id);

        if (!existingUser) throw new UserNotFound();
        if (existingUser.isDeleted === 1) throw new DeletedUser();

        const user = await this._userRepository.deactivateUser(id);
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }


    public async activateUser(id: number): Promise<UserWithoutPassword> {
        const existingUser = await this._userRepository.getUserById(id);

        if (!existingUser) throw new UserNotFound();
        if (existingUser.isDeleted === 1) throw new DeletedUser();

        const user = await this._userRepository.activateUser(id);
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    public async logicalUserDeletion(id: number): Promise<UserWithoutPassword> {
        const existingUser = await this._userRepository.getUserById(id);

        if (!existingUser) throw new UserNotFound();
        if (existingUser.status === true) throw new ActiveUser();

        const user = await this._userRepository.logicalUserDeletion(id);
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}