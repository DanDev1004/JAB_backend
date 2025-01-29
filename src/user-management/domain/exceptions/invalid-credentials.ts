export class InvalidCredentials extends Error {
    constructor() {
        super("Credenciales invalidas");
        this.name = "InvalidCredentialsException";
    }
}