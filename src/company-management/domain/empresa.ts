export class Empresa{
    empresaId:          number;
    nombre:             string;
    logo:               string;
    precioKilo:         number;
    //===== Logical elimination and auditing: attributes =======//
    status:             boolean;
    isDeleted:          number;
    createdAt:          Date;
    updatedAt:          Date;

    constructor(nombre: string, logo: string, precioKilo: number){
        this.empresaId = -1;
        this.nombre = nombre;
        this.logo = logo;
        this.precioKilo = precioKilo;
        //===== Logical elimination and auditing: initialize =======//      
        this.status = true;
        this.isDeleted = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}