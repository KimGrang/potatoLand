import { Test, TestingModule } from '@nestjs/testing';
import { ColumController } from './colum.controller';
import { ColumService } from './colum.service';

describe('ColumController', () => {
  let controller: ColumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumController],
      providers: [ColumService],
    }).compile();

    controller = module.get<ColumController>(ColumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
