export class UserNotFound extends Error {
    constructor() {
        super("Usuario no encontrado");
    }
}