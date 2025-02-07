export class Empresa{
    empresaId:          number;
    nombre:             string;
    ruc:                string | null;
    logo:               string | null;
    precioPorKilo:      number;
    //===== Logical elimination and auditing: attributes =======//
    status:             boolean;
    isDeleted:          number;
    createdAt:          Date;
    updatedAt:          Date;

    constructor(nombre: string, ruc: string, logo: string, precioKilo: number){
        this.empresaId = -1;
        this.nombre = nombre;
        this.ruc = ruc ?? null;
        this.logo =  logo ?? null;
        this.precioPorKilo = precioKilo;
        //===== Logical elimination and auditing: initialize =======//      
        this.status = true;
        this.isDeleted = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}