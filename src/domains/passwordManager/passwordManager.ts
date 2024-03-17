import { compare, genSalt, hash } from 'bcrypt';
import { injectable } from 'inversify';

export interface IPasswordManager {
  generateSalt(): Promise<string>;
  hashPwd(pwd: string, salt: string): Promise<string>;
  checkPwd(plainPwd: string, hashedPwd: string): Promise<boolean>;
}

@injectable()
export class PasswordManager implements IPasswordManager {
  async generateSalt(): Promise<string> {
    return genSalt();
  }

  async hashPwd(pwd: string, salt: string): Promise<string> {
    return hash(pwd, salt);
  }

  async checkPwd(plainPwd: string, hashedPwd: string): Promise<boolean> {
    return compare(plainPwd, hashedPwd);
  }
}
