export class GroupActive extends Error {
    constructor() {
        super("El grupo está activo, debe ser desactivado antes de ser eliminado");
        this.name = "GroupActiveException";
    }
}