export class DniExists extends Error {
    constructor() {
        super("El DNI ya existe");
        this.name = "DataExistsException";
    }
}

export class EmailExists extends Error {
    constructor() {
        super("El email ya existe");
        this.name = "DataExistsException";
    }
}

export class PhoneExists extends Error {
    constructor() {
        super("El teléfono ya existe");
        this.name = "DataExistsException";
    }
}
