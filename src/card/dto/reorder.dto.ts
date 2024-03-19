import { IsNotEmpty, IsArray } from "class-validator";

export class ReorderCardsDto {
  @IsArray()
  @IsNotEmpty({ message: "비었어" })
  cardIds: number[];
}
