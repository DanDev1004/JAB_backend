export class EmpresaGroupNotFound extends Error {
    constructor() {
        super("EmpresaGroup no encontrada");
        this.name = "EmpresaGroupNotFound";
    }
}

export class EmpresaNotFound extends Error {
    constructor() {
        super("Empresa no encontrada");
        this.name = "EmpresaNotFound";
    }
}

export class GroupNotFound extends Error {
    constructor() {
        super("Grupo no encontrado");
        this.name = "GroupNotFoundException";
    }
}