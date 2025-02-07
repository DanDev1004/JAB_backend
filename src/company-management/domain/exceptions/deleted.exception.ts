export class DeletedGroup extends Error {
    constructor() {
        super("El grupo ha sido eliminado");
        this.name = "DeletedGroupException";
    }
}

export class DeletedEmpresa extends Error {
    constructor() {
        super("La empresa ha sido eliminada");
        this.name = "DeletedEmpresaException";
    }
}

export class DeletedEmpresaGroup extends Error {
    constructor() {
        super("La relacion empresaGroup ha sido eliminada");
        this.name = "DeletedEmpresaGroupException";
    }
}