import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BoardVisibility } from "../types/boardVisibility.type";
import { ApiProperty } from "@nestjs/swagger";
import { InviteOption } from "../types/inviteOption.type";

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "보드의 이름을 명시해주세요." })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "보드의 배경 색을 명시해주세요." })
  backgroundColor: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "보드에 대한 설명을 작성해주세요." })
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BoardVisibility)
  @IsNotEmpty({ message: "보드의 타입을 명시해주세요." })
  visibility?: BoardVisibility;

  @ApiProperty()
  @IsOptional()
  @IsEnum(InviteOption)
  @IsNotEmpty({ message: "초대 가능 옵션을 선택해주세요." })
  inviteOption?: InviteOption;
}
