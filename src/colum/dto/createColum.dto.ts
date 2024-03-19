import { PickType } from "@nestjs/swagger";
import { Colum } from "../entities/colum.entity";

export class CreateColumDto extends PickType(Colum, ['columOrder', 'title']) {}


