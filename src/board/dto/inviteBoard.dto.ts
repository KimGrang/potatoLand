import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { BoardMemberType } from "../types/boardMember.type";

export class InviteBoardDto {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty({ message: "초대하려는 사용자의 아이디를 명시해주세요." })
  userId: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BoardMemberType)
  @IsNotEmpty({ message: "초대하려는 사용자의 권한을 명시해주세요." })
  role?: BoardMemberType;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsNotEmpty({
    message: "초대링크의 만료시간을 명시해주세요. 단위는 시간입니다.",
  })
  expiresIn?: number = 24;
}
