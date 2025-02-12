import { IUserRepository } from "../../domain/interfaces/user.interface";
import { IPasswordHasher } from "../../domain/interfaces/password-hasher.interface";
import { ITokenGenerator } from "../../domain/interfaces/token-generator.interface";
import { UserNotFound } from "../../domain/exceptions/not-found.exception";
import { InvalidCredentials } from "../../domain/exceptions/invalid-credentials";
import { DeletedUser } from "../../domain/exceptions/deleted.exception";
import { InactiveUser } from "../../domain/exceptions/inactive.exception";

export class TokenGeneratorService {
    private _userRepository: IUserRepository;
    private _passwordHasher: IPasswordHasher;
    private _tokenGenerator: ITokenGenerator;

    constructor(
        userRepository: IUserRepository,
        passwordHasher: IPasswordHasher,
        tokenGenerator: ITokenGenerator
    ) {
        this._userRepository = userRepository;
        this._passwordHasher = passwordHasher;
        this._tokenGenerator = tokenGenerator;
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this._userRepository.getUserByEmail(email);
    
        if (!user)                   throw new UserNotFound();
        if (user.status === false)    throw new InactiveUser();
        if (user.isDeleted === 1)     throw new DeletedUser();
    
        const isPasswordValid = await this._passwordHasher.compare(password, user.password);
        if (!isPasswordValid) throw new InvalidCredentials();
    
        return this._tokenGenerator.generateToken(user.userId, user.rol);
    }
}
