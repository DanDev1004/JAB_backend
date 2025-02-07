export class InactiveUser extends Error {
    constructor() {
        super("El usuario se encuentra inactivo");
        this.name = "InactiveUserException";
    }
}