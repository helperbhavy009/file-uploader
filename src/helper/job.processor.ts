import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RepositoryService } from 'src/config/repository.service';
import { File } from 'src/entity/file.entity';
import { DaoServices } from './dao.service';

@Processor('file-processing')
export class FileProcessor extends WorkerHost {
  constructor(
    private repoService: RepositoryService,
    private daoServices: DaoServices<File>,
  ) {
    super();
  }

  async process(job: Job) {

    const fileRepo = this.repoService.getRepository(File);

    const file = await this.daoServices.findOneDao(
      fileRepo,
      { id: job.data.fileId },
      ['id', 'status', 'extracted_data'],
    );
    if (!file) return;

    file.status = 'processing';
    await fileRepo.save(file);

    try {
      // Simulate work
      await new Promise((res) => setTimeout(res, 2000));
      file.status = 'processed';
      file.extracted_data = `SHA mock: ${Math.random()
        .toString(36)
        .substring(7)}`;
      await fileRepo.save(file);
    } catch (e) {
      file.status = 'failed';
      file.extracted_data = 'Processing failed';
      await fileRepo.save(file);
    }

  }
}
