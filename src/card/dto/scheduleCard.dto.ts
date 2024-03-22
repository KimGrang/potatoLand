import { PickType } from "@nestjs/swagger";
import { Card } from "../entities/card.entity";

export class ScheduleCardDto extends PickType(Card, ['id', 'colum_id', 'deadline']) {}