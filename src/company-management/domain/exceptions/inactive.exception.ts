export class InactiveGroup extends Error {
    constructor() {
        super("El grupo se encuentra inactivo");
        this.name = "InactiveGroupException";
    }
}

export class InactiveEmpresa extends Error {
    constructor() {
        super("La empresa se encuentra inactiva");
        this.name = "InactiveEmpresaException";
    }
}

export class InactiveEmpresaGroup extends Error {
    constructor() {
        super("La relacion empresaGroup se encuentra inactiva");
        this.name = "InactiveEmpresaGroupException";
    }
}