import { IEmpresaRepository } from "../../domain/interfaces/empresa.interface";
import { Empresa } from "../../domain/entities/empresa";
import { EmpresaNotFound } from "../../domain/exceptions/not-found.exception";
import { DeletedEmpresa } from "../../domain/exceptions/deleted.exception";
import { InactiveEmpresa } from "../../domain/exceptions/inactive.exception";
import { ActiveEmpresa } from "../../domain/exceptions/active.exception";
import { NombreEmpresaExists, RucEmpresaExists } from "../../domain/exceptions/empresa-data-exists.exception";

export class EmpresaValidator {
    static async validateEmpresaExists(
        empresaRepository: IEmpresaRepository,
        id: number
    ): Promise<Empresa> {
        const empresa = await empresaRepository.getEmpresaById(id);
        
        if (!empresa)                   throw new EmpresaNotFound();
        if (empresa.isDeleted === 1)    throw new DeletedEmpresa();

        return empresa;
    }

    static async validateEmpresaExistsToEdition(
        empresaRepository: IEmpresaRepository,
        id: number
    ): Promise<Empresa> {
        const empresa = await empresaRepository.getEmpresaById(id);
        
        if (!empresa)                   throw new EmpresaNotFound();
        if (empresa.isDeleted === 1)    throw new DeletedEmpresa();
        if (empresa.status === false)   throw new InactiveEmpresa();

        return empresa;
    }

    static async validateEmpresaExistsToDeletion(
        empresaRepository: IEmpresaRepository,
        id: number
    ): Promise<Empresa> {
        const empresa = await empresaRepository.getEmpresaById(id);
        
        if (!empresa)                   throw new EmpresaNotFound();
        if (empresa.isDeleted === 1)    throw new DeletedEmpresa();
        if (empresa.status === true)    throw new ActiveEmpresa();

        return empresa;
    }

    static validateEmpresaData(validacionEmpresa: { nombreExists: boolean; rucExists: boolean }) {
        if (validacionEmpresa.nombreExists)     throw new NombreEmpresaExists();
        if (validacionEmpresa.rucExists)        throw new RucEmpresaExists();
    }
}
