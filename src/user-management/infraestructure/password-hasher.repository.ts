import bcrypt from 'bcryptjs';
import { hash, compare } from 'bcryptjs';
import { IPasswordHasher } from '../domain/interfaces/password-hasher.interface';

export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return hash(password, salt); 
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}