import { Module } from '@nestjs/common';
import { UploadModule } from './module/upload/upload.module';
import { DatabaseModule } from './config/database.module';
import { AuthService } from './module/auth/service/auth.service';
import { AuthModule } from './module/auth/auth.module';
import { BcryptService } from './helper/bcrypt.service';
import { JWTAuthService } from './helper/jwt-auth.service';
import { DaoServices } from './helper/dao.service';


@Module({
  imports: [UploadModule, DatabaseModule, AuthModule],
  providers: [AuthService, BcryptService, JWTAuthService, DaoServices],
})
export class AppModule {}
