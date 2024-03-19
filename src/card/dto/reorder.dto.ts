import { IsNotEmpty } from "class-validator";

export class ReorderCardsDto {
  @IsNotEmpty({ message: "비었어" })
  cardIds: number;
}
