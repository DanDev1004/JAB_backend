export interface ITokenGenerator {
    generateToken(userId: number, role: string): string;
}
