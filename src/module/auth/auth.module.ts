import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/config/database.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { DaoServices } from 'src/helper/dao.service';
import { RepositoryService } from 'src/config/repository.service';
import { BcryptService } from 'src/helper/bcrypt.service';
import { JWTAuthService } from 'src/helper/jwt-auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, DaoServices, RepositoryService, BcryptService, JWTAuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
