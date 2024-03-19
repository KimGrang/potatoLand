import { PickType } from "@nestjs/swagger";
import { Colum } from "../entities/colum.entity";

export class RemoveColumDto extends PickType(Colum, ['id']) {}