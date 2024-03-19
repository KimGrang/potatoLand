import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PickType } from "@nestjs/swagger";
import { Board } from "../entities/board.entity";

export class UpdateBoardDto extends PickType(Board, [
  "description",
  "visibility",
  "inviteOption",
]) {
  /**
   * name
   * @example "Done"
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  /**
   * backgroundColor
   * @example "blue"
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  backgroundColor?: string;
}
