import { Test, TestingModule } from '@nestjs/testing';
import { ColumService } from './colum.service';

describe('ColumService', () => {
  let service: ColumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumService],
    }).compile();

    service = module.get<ColumService>(ColumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
