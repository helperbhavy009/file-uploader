import { Test, TestingModule } from '@nestjs/testing';
import { DaoServicesService } from './dao.service';

describe('DaoServicesService', () => {
  let service: DaoServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaoServicesService],
    }).compile();

    service = module.get<DaoServicesService>(DaoServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
