import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class CreateBoardDto extends PickType(Board, [
  "name",
  "backgroundColor",
  "description",
  "visibility",
  "inviteOption",
]) {}
