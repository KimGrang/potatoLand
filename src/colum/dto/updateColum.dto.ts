import { PickType } from '@nestjs/swagger';
import { Colum } from '../entities/colum.entity';

export class UpdateColumDto extends PickType(Colum,  ['title', 'id', 'board_id']) {}
