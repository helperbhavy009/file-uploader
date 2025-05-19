import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DaoServices } from '../helper/dao.service';
import { User } from '../entity/user.entity';
import { RepositoryService } from '../config/repository.service';
import { ERROR_MESSAGES } from '../utils/message';
import { JWTAuthService } from 'src/helper/jwt-auth.service';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    // Injecting a generic DAO service for common database operations
    private readonly daoServices: DaoServices<User>,
    private jwtService: JWTAuthService,
    private readonly repository: RepositoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the HTTP request from the execution context
    const request = context.switchToHttp().getRequest();
    // Retrieve the token from the Authorization header
    const token = this.extractTokenFromHeader(request);
    // If no token is found, throw an Unauthorized exception
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // Verify the JWT token using the secret key from environment variables
      const payload = await this.jwtService.verifyToken(token);
      // Verify the Token Data with Database for the User Authorication
      const userData = await this.daoServices.findOneDao(
        this.repository.getRepository(User),
        { email: payload?.email },
        ['id'],
      );

      //Throw If Database not having this user data
      if (!userData?.id) {
        throw new UnauthorizedException(ERROR_MESSAGES.ACCOUNT_NOT_FOUND);
      }

      // Attach the decoded payload to the request object for further use
      request['user'] = payload;
    } catch (error) {
      console.log(error)
      // If verification fails, throw an Unauthorized exception
      throw new UnauthorizedException();
    }
    // Allow the request to proceed if token verification is successful
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Extract the Authorization header and split it into parts
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Return the token only if the type is 'Bearer', otherwise return undefined
    return type === 'Bearer' ? token : undefined;
  }
}
