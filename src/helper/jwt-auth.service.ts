import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTAuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Generates JWT token for a given user
   */
  generateToken(user: { id: number; email: string }): string {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  /**
   * Verifies a JWT token (optional, can be used for debugging)
   */
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Invalid Token");
    }
  }
}
