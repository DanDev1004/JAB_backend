import { IUserRepository } from "../domain/interfaces/user.interface";
import { UserSpecificationRules } from "../domain/rules/user.specification.rules";
import { User } from "../domain/user";
import { IPasswordHasher } from "../domain/interfaces/password-hasher.interface";

export class UserService {
    private userRepository: IUserRepository;
    private passwordHasher: IPasswordHasher;

    constructor(
        userRepository: IUserRepository,
        passwordHasher: IPasswordHasher 
    ) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
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

        const hashedPassword = await this.passwordHasher.hash(password);

        const user: User = new User(
            DNI, nombres, email, telefono, hashedPassword, rol
        );
        return this.userRepository.addUser(user);
    }

}