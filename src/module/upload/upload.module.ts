import { Module } from '@nestjs/common';
import { FileUploadController } from './controller/file-upload.controller';
import { FileUploadService } from './service/file-upload.service';
import { DatabaseModule } from 'src/config/database.module';
import { DaoServices } from 'src/helper/dao.service';
import { RepositoryService } from 'src/config/repository.service';
import { AuthModule } from '../auth/auth.module';
import { JWTAuthService } from 'src/helper/jwt-auth.service';
import { BullModule } from '@nestjs/bullmq';
import { FileProcessor } from 'src/helper/job.processor';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    BullModule.registerQueue({
      name: 'file-processing',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [FileUploadController],
  providers: [
    FileUploadService,
    DaoServices,
    RepositoryService,
    JWTAuthService,
    FileProcessor,
  ],
})
export class UploadModule {}
