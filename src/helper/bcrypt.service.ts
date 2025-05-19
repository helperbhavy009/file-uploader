import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class BcryptService {

  /**
   * Compares a plain text password with a hashed password
   * @param {string} plainTextPassword  - Which come from the user Login API.
   * @param {string} hashedPassword - Hashed Password Which Come Database
   * @returns {boolean} - the bool value which confirm the comparision is success or failure
   */
  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
