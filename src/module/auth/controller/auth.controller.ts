import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * API for vefiy the login Details of User
   * @param {object} body  - Body which get from user
   * @param {string} body.email - user email
   * @param {string} body.password - user password
   * @returns {string} access_token - Access Token for the user
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    try {
      return await this.authService.login(body.email, body.password);
    } catch (error) {
      throw error;
    }
  }
}
