import { PickType } from '@nestjs/swagger';
import { Colum } from '../entities/colum.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateColumDto extends PickType(Colum,  ['title', 'id']) {

  @IsNotEmpty({message: 'boardId를 입력해 주세요.'})
  @IsNumber()
  boardId: number;
}
