import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { BoardMemberType } from "../type/boardMember.type";

export class InviteBoardDto {
  /**
   * userId
   * @example 2
   */
  @IsInt()
  @IsNotEmpty({ message: "초대하려는 사용자의 아이디를 명시해주세요." })
  userId: number;

  /**
   * role
   * @example "guest"
   */
  @IsOptional()
  @IsEnum(BoardMemberType)
  @IsNotEmpty({ message: "초대하려는 사용자의 권한을 명시해주세요." })
  role?: BoardMemberType;

  /**
   * expiresIn
   * @example "12"
   */
  @IsOptional()
  @IsInt()
  @IsNotEmpty({
    message: "초대링크의 만료시간을 명시해주세요. 단위는 시간입니다.",
  })
  expiresIn?: number = 24;
}
