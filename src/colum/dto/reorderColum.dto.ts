import { PickType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty } from "class-validator";
import { Colum } from "../entities/colum.entity";

export class ReorderColumDto extends PickType(Colum, ['board_id']) {
  @IsArray()
  @IsNotEmpty({message: '변경하고 싶은 컬럼 순서를 입력해 주세요.'})
  columIds: number[];
}