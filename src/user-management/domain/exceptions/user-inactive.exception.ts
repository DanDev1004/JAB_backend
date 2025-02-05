export class UserInactive extends Error {
    constructor() {
        super("El usuario se encuentra inactivo");
        this.name = "UserInactiveException";
    }
}