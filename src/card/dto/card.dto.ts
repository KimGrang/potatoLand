import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../../comment/entities/comment.entity";

export class CreateCardDto {
  @ApiProperty({ example: 1, description: "cardOrder" })
  @IsNotEmpty()
  @IsNumber()
  cardOrder?: number;

  @ApiProperty({
    example: "펩시 제로 라임",
    description: "cardOrder",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: "펩시 제로 라임은 진리입니다.",
    description: "cardOrder",
  })
  @IsOptional()
  @IsString()
  desc?: string | null;

  @ApiProperty({ example: 1, description: "cardOrder" })
  @IsOptional()
  @IsString()
  color?: string | null;
}

export class CardDetailsDto {
  @ApiProperty({ example: 1, description: "cardOrder", required: true })
  cardOrder: number;
  @ApiProperty({
    example: "펩시 제로 라임",
    description: "title",
  })
  title: string;
  @ApiProperty({
    example: "펩시 제로 라임은 진리입니다.",
    description: "desc",
  })
  desc: string;
  @ApiProperty({ example: "black", description: "color", required: true })
  color: string;
  @ApiProperty({ example: 1, description: "id", required: true })
  id: number;
  // @ApiProperty({ example: ["펩시","제로","라임"], description: "id", required: true })
  comments: Comment[];
  @ApiProperty({
    example: "2024-03-19 06:14:10.769099",
    description: "createdAt",
  })
  createdAt: Date;
  @ApiProperty({
    example: "2024-03-19 10:52:42.000000",
    description: "updatedAt",
  })
  updatedAt: Date;
}

export class UpdateCardDto {
  @ApiProperty({
    example: "펩시 제로 라임",
    description: "cardOrder",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: "펩시 제로 라임은 진리입니다.",
    description: "cardOrder",
  })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({ example: "black", description: "cardOrder" })
  @IsOptional()
  @IsString()
  color?: string;
}

export class ReorderCardsDto {
  @ApiProperty({ example: [1, 2, 3], description: "cardOrder" })
  @IsArray()
  @IsNotEmpty({ message: "비었어" })
  cardIds: number[];
}
