import { PickType } from '@nestjs/swagger';
import { Colum } from '../entities/colum.entity';

export class UpdateColumDto extends PickType(Colum, ['boardId', 'title']) {}
