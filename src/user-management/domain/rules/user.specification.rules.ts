import { 
    StringFormatLengthSpecification, 
    EmailFormatSpecification, 
    PasswordFormatSpecification,
    RoleSpecification
} from "./specifitacion";
import { Role } from "../enums/roles";

export class UserSpecificationRules {
    static validateDNI(dni: string): void {
        const dniSpecification = new StringFormatLengthSpecification(8);

        if (!dniSpecification.isSatisfiedBy(dni)) {
            throw new Error(dniSpecification.errorMessage(`DNI debe tener ${dniSpecification._digitCount}, usted ingresó ${dni.length}`));
        }
    }

    static validateTelefono(telefono: string): void {
        const telefonoSpecification = new StringFormatLengthSpecification(9);

        if (!telefonoSpecification.isSatisfiedBy(telefono)) {
            throw new Error(telefonoSpecification.errorMessage(`Teléfono debe tener ${telefonoSpecification._digitCount}, usted ingresó ${telefono.length}`));
        }
    }

    static validateEmail(email: string): void {
        const emailSpecification = new EmailFormatSpecification();

        if (!emailSpecification.isSatisfiedBy(email)) {
            throw new Error(emailSpecification.errorMessage('Email invalido'));
        }
    }

    static validatePassword(password: string): void {
        const passwordSpecification = new PasswordFormatSpecification();

        if (!passwordSpecification.isSatisfiedBy(password)) {
            throw new Error(passwordSpecification.errorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'));
        }
    }

    static validateRole(role: string): void {
        const roleSpecification = new RoleSpecification();

        if (!roleSpecification.isSatisfiedBy(role)) {
            throw new Error(roleSpecification.errorMessage(`Rol inválido. Los roles válidos son: ${Object.values(Role).join(', ')}`));
        }
    }
}