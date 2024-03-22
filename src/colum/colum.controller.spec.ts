import { Test, TestingModule } from "@nestjs/testing";
import { ColumController } from "./colum.controller";
import { ColumService } from "./colum.service";
import { CreateColumDto } from "./dto/createColum.dto";
import { Colum } from "./entities/colum.entity";
import { HttpStatus } from "@nestjs/common";

describe("ColumController", () => {
  let columController: ColumController;

  let columService = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    reorderColum: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColumController],
      providers: [
        ColumService,
        {
          provide: ColumService,
          useValue: columService,
        },
      ],
    }).compile();

    columController = module.get<ColumController>(ColumController);
  });

  it("should be defined", () => {
    expect(columController).toBeDefined();
  });

  it("create => should create a new colum by given data", async () => {
    // arrange
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

    columService.create.mockResolvedValue(colum);

    // act
    const result = await columController.create(createColumDto);

    // assert
    expect(columService.create).toHaveBeenCalledWith(createColumDto);
    expect(result).toEqual({
      statusCode: HttpStatus.CREATED,
      message: "컬럼이 생성되었습니다.",
      data: colum,
    });
  });

  it("create => should throw an error if given data is wrong", async () => {
    // arrange
    const createColumDto = {} as CreateColumDto;
    columService.create.mockResolvedValue(undefined);

    await expect(columController.create(createColumDto)).rejects.toThrow();
  });
});
