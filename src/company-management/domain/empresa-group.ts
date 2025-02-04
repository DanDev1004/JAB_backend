export class EmpresaGroup {
    empresaGroupId:     number;
    empresaId:          number;
    groupId?:           number | null;
    //===== Logical elimination and auditing: attributes =======//
    status:             boolean;
    isDeleted:          number;
    createdAt:          Date;
    updatedAt:          Date;

    constructor(empresaId: number, groupId: number | null) {
        this.empresaGroupId = -1;
        this.empresaId = empresaId;
        this.groupId = groupId ?? null;
        //===== Logical elimination and auditing: initialize =======//      
        this.status = true;
        this.isDeleted = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}