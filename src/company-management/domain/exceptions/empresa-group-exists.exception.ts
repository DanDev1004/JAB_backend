export class relationExists extends Error {
    constructor() {
        super("La relación empresaId-groupId ya existe.");
        this.name = "relationExistsException";
    }
}
