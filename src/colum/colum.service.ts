import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateColumDto } from "./dto/createColum.dto";
import { UpdateColumDto } from "./dto/updateColum.dto";
import { In, Repository } from "typeorm";
import { Colum } from "./entities/colum.entity";
import { InjectRepository } from "@nestjs/typeorm";
import _, { isNil } from "lodash";
import { ReorderColumDto } from "./dto/reorderColum.dto";

@Injectable()
export class ColumService {
  constructor(
    @InjectRepository(Colum)
    private readonly columRepository: Repository<Colum>,
  ) {}

  //컬럼 생성
  async create(createColumDto: CreateColumDto) {
    const { columOrder, board_id, title } = createColumDto;

    //   const existedColum = await this.columRepository
    //       .createQueryBuilder('colum')
    //       .leftJoinAndSelect("colum.board", "board.id")
    //       .where("colum.title", {title})
    //       .andWhere("board.id = boardId", {board_id})
    //       .getOne()

    // if(existedColum) {
    //   throw new BadRequestException('유효하지 않은 요청입니다.')
    // }

    const colum = await this.columRepository.save({
      board_id,
      columOrder,
      title,
    });

    return colum;
  }

  //컬럼 이름 수정
  async update(updateColumDto: UpdateColumDto) {
    const { board_id, id, title } = updateColumDto;
    const existedColum = await this.columRepository.findOne({
      relations: {
        board: true,
      },
      where: {
        board: {
          id: board_id,
        },
        title,
      },
    });
    if (existedColum) {
      throw new BadRequestException("유효하지 않은 요청입니다.");
    }

    return await this.columRepository.update({ id }, { title });
  }
  //컬럼 삭제
  async remove(id: number) {
    const existedColum = await this.columRepository.findOneBy({ id });
    if (isNil(existedColum)) {
      throw new BadRequestException("유효하지 않은 요청입니다.");
    }

    return await this.columRepository.delete({ id });
  }

  //컬럼 순서 이동
  async reorderColum({ columIds, board_id }: ReorderColumDto) {
    const colums = await this.columRepository.find({
      where: {
        id: In(columIds),
      },
    });
    if (colums.length !== columIds.length) {
      throw new BadRequestException("유효하지 않은 요청입니다.");
    }
    for (let element of colums) {
      if (element.board_id !== board_id) {
        throw new BadRequestException("유효하지 않은 요청입니다.");
      }
    }

    const ordersMap = columIds.reduce((map, id, index) => {
      map[id] = index + 1;
      return map;
    }, {});

    await Promise.all(
      colums.map((colum) => {
        colum.columOrder = ordersMap[colum.id];
        return this.columRepository.save(colum);
      }),
    );
  }
}
