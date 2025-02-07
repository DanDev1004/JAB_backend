export class NombreEmpresaExists extends Error {
    constructor() {
        super("El nombre de la empresa ya existe");
        this.name = "DataExistsException";
    }
}

export class RucEmpresaExists extends Error {
    constructor() {
        super("El ruc de la empresa ya existe");
        this.name = "DataExistsException";
    }
}
