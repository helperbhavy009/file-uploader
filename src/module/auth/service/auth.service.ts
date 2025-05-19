import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryService } from 'src/config/repository.service';
import { User } from 'src/entity/user.entity';
import { BcryptService } from 'src/helper/bcrypt.service';
import { DaoServices } from 'src/helper/dao.service';
import { JWTAuthService } from 'src/helper/jwt-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JWTAuthService,
    private repository: RepositoryService,
    private readonly daoServices: DaoServices<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  /**
   * API to verify user credentials and generate JWT access token
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {string} access_token -  JWT access token for authenticated user
   * @throws {UnauthorizedException} When credentials are invalid
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    try {
      // Find user by email, selecting only id and password fields
      const userResult = await this.daoServices.findOneDao(
        this.repository.getRepository(User),
        {
          email,
        },
        ['id', 'email', 'password'],
      );

      //Check if user details exist in Databse
      if (!userResult) {
        throw new UnauthorizedException('Account not found');
      }

      // Match from the bcrypt service
      const isMatched = await this.bcryptService.comparePasswords(
        password,
        userResult?.password,
      );
      // Check if user exists and password matches
      if (!isMatched) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const access_token = this.jwtService.generateToken({
        email: userResult.email,
        id: userResult.id,
      });

      // Return signed JWT access token
      return {
        access_token: access_token,
      };
    } catch (error) {
      throw error;
    }
  }
}
