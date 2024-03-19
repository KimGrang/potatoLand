import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BoardVisibility } from "../types/boardVisibility.type";
import { ApiProperty } from "@nestjs/swagger";
import { InviteOption } from "../types/inviteOption.type";

export class UpdateBoardDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  backgroundColor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BoardVisibility)
  @IsNotEmpty()
  visibility?: BoardVisibility;

  @ApiProperty()
  @IsOptional()
  @IsEnum(InviteOption)
  @IsNotEmpty()
  inviteOption?: InviteOption;
}
