import { IsArray, IsNotEmpty } from "class-validator";

export class ReorderColumDto {
  @IsArray()
  @IsNotEmpty({message: '변경하고 싶은 컬럼 순서를 입력해 주세요.'})
  columIds: number[];
}