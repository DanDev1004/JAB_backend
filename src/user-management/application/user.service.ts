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
    ): Promise<User> {

        UserSpecificationRules.validateDNI(DNI);
        UserSpecificationRules.validateTelefono(telefono);
        UserSpecificationRules.validateEmail(email);
        UserSpecificationRules.validatePassword(password);
        UserSpecificationRules.validateRole(rol);

        const hashedPassword = await this._passwordHasher.hash(password);

        const user: User = new User(
            DNI, nombres, email, telefono, hashedPassword, rol
        );
        return this._userRepository.addUser(user);
    }

    public async getUserById(id: number): Promise<UserWithoutPassword> {
        const user = await this._userRepository.getUserById(id);

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

}