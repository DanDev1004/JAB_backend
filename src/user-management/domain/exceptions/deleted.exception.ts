export class UserDeleted extends Error {
    constructor() {
        super("El usuario ha sido eliminado");
        this.name = "UserDeletedException";
    }
}