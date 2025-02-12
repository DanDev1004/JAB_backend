export class Group{
    groupId:            number;
    nombre:             string;
    color:              string;
    //===== Logical elimination and auditing: attributes =======//  
    status:             boolean;
    isDeleted:          number;
    createdAt:          Date;
    updatedAt:          Date;

    constructor(nombre: string, color: string){
        this.groupId = -1;
        this.nombre = nombre;
        this.color = color;
        //===== Logical elimination and auditing: attributes =======//
        this.status = true;
        this.isDeleted = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}