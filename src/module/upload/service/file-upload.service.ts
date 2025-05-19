import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/config/repository.service';
import { File } from 'src/entity/file.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { DaoServices } from 'src/helper/dao.service';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectQueue('file-processing') private queue: Queue,
    private repoService: RepositoryService,
    private daoServices: DaoServices<File>,
  ) {}

  async handleUpload(file: Express.Multer.File, meta, user) {
    const savedFile = await this.daoServices.createDao(
      this.repoService.getRepository(File),
      {
        user_id: user.id,
        originalFilename: file.originalname,
        storagePath: file.path,
        title: meta.title,
        description: meta.description,
        status: 'uploaded',
      },
    );

    await this.queue.add('process-file', { fileId: savedFile.id });

    console.log('Job added to queue:', savedFile.id);

    return {
      fileId: savedFile.id,
      status: savedFile.status,
    };
  }

  async getFileById(id: number, user: any) {
    return this.daoServices.findOneDao(this.repoService.getRepository(File), {
      id,
      user_id: user.sub,
    });
  }
}
