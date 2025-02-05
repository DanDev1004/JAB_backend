export class GroupDeleted extends Error {
    constructor() {
        super("El grupo ha sido eliminado");
        this.name = "GroupDeletedException";
    }
}