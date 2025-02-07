export class ActiveGroup extends Error {
    constructor() {
        super("El grupo está activo, debe ser desactivado antes de ser eliminado");
        this.name = "ActiveGroupException";
    }
}

export class ActiveEmpresa extends Error {
    constructor() {
        super("La empresa está activa, debe ser desactivada antes de ser eliminada");
        this.name = "ActiveEmpresaException";
    }
}

export class ActiveEmpresaGroup extends Error {
    constructor() {
        super("La relacion EmpresGroup está activa, debe ser desactivada antes de ser eliminada");
        this.name = "ActiveEmpresaGroupException";
    }
}