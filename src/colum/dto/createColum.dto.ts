import { PickType } from "@nestjs/swagger";
import { Colum } from "../entities/colum.entity";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateColumDto extends PickType(Colum, ['columOrder', 'title', 'board_id']) {}


