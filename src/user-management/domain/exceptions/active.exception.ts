export class ActiveUser extends Error {
    constructor() {
        super("El usuario está activo, debe ser desactivado antes de ser eliminado");
        this.name = "ActiveUserException";
    }
}