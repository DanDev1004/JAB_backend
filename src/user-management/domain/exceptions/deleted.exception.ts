export class DeletedUser extends Error {
    constructor() {
        super("El usuario ha sido eliminado");
        this.name = "DeletedUserException";
    }
}