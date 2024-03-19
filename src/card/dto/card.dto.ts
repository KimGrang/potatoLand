import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from "class-validator";
// import { Comment } from "../comment/entities/comment.entity";

export class CreateCardDto {
  @IsNotEmpty()
  @IsNumber()
  cardOrder?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc?: string | null;

  @IsOptional()
  @IsString()
  color?: string | null;
}

export class CardDetailsDto {
  cardOrder: number;
  title: string;
  desc: string;
  color: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
