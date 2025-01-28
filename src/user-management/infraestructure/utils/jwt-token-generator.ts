import { ITokenGenerator } from '../../domain/interfaces/token-generator.interface';
import jwt from 'jsonwebtoken';

export class JwtTokenGenerator implements ITokenGenerator {
    private _jwtSecret: string;

    constructor(jwtSecret: string) {
        this._jwtSecret = jwtSecret;
    }

    public generateToken(userId: number, role: string): string {
        return jwt.sign(
            { userId, role },
            this._jwtSecret,
            { expiresIn: '1h' }
        );
    }
}
