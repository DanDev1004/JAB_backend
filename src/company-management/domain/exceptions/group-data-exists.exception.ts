export class NombreExists extends Error {
    constructor() {
        super("El nombre ya existe");
        this.name = "DataExistsException";
    }
}
