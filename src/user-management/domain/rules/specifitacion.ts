import { Role } from "../enums/roles";

export interface Specification<T> {
    isSatisfiedBy(value: T): boolean;
    errorMessage(err: string): string;
}

export class StringFormatLengthSpecification implements Specification<string> {
    private readonly digitCount: number;

    constructor(digitCount: number) {
        this.digitCount = digitCount;
    }

    get _digitCount(): number {
        return this.digitCount;
    }

    isSatisfiedBy(value: string): boolean {
        const regex = new RegExp(`^\\d{${this.digitCount}}$`);
        return regex.test(value);
    }

    errorMessage(error: string): string {
        return error;
    }
}


export class EmailFormatSpecification implements Specification<string> {
    isSatisfiedBy(value: string): boolean {
        const regex = new RegExp(`^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$`);
        return regex.test(value);
    }

    errorMessage(error: string): string {
        return error;
    }
}

export class PasswordFormatSpecification implements Specification<string> {
    isSatisfiedBy(value: string): boolean {
        const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$`);
        return regex.test(value);
    }

    errorMessage(error: string): string {
        return error;
    }
}

export class RoleSpecification implements Specification<string> {
    isSatisfiedBy(value: string): boolean {
        return Object.values(Role).includes(value as Role);
    }

    errorMessage(error: string): string {
        return error;
    }
}