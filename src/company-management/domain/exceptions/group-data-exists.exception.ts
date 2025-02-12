export class NombreGroupExists extends Error {
    constructor() {
        super("El nombre del grupo ya existe");
        this.name = "DataExistsException";
    }
}
