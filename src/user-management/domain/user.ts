export class User{
    userId:         number;
    DNI:            string;
    nombres:        string;
    email:          string;
    telefono:       string;
    password:       string;
    status:         boolean;
    rol:            string;
    isDeleted:      number;
    createdAt:      Date;
    updatedAt:      Date;

    constructor(DNI: string, nombres: string, email: string, telefono: string, password: string, rol: string){
        this.userId = -1;
        this.DNI = DNI;
        this.nombres = nombres;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
        this.status = true;
        this.rol = rol;
        this.isDeleted = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

export type UserWithoutPassword = Omit<User, 'password'>;