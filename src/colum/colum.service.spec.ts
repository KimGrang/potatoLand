import { Test, TestingModule } from "@nestjs/testing";
import { ColumService } from "./colum.service";
import { Repository } from "typeorm";
import { Colum } from "./entities/colum.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateColumDto } from "./dto/createColum.dto";
import { Card } from "../card/entities/card.entity";

describe("ColumService", () => {
  let columService: ColumService;
  let columRepotiory: Partial<Record<keyof Repository<Colum>, jest.Mock>>;

  beforeEach(async () => {
    columRepotiory = {
      save: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColumService,
        {
          provide: getRepositoryToken(Colum),
          useValue: columRepotiory,
        },
      ],
    }).compile();

    columService = module.get<ColumService>(ColumService);
  });

  it("should be defined", () => {
    expect(columService).toBeDefined();
  });

  describe("create test", () => {
    it("should create a column if given createColumDto", async () => {
      const createColumDto = {
        columOrder: 1,
        title: "test",
        board_id: 1,
      } as CreateColumDto;

      const colum = {
        id: 1,
        columOrder: 1,
        title: "test",
        createdAt: new Date(),
        updatedAt: new Date(),
        card: [],
        board_id: 1,
      } as Colum;

      columRepotiory.save.mockResolvedValue(colum);

      // act
      const result = await columService.create(createColumDto);

      // assert
      expect(columRepotiory.save).toHaveBeenCalled();
      expect(columRepotiory.save).toHaveBeenCalledWith(createColumDto);
      expect(result).toEqual(colum);
    });
  });
});
