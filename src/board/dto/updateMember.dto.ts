import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { BoardMemberType } from "../types/boardMember.type";

export class UpdateMemberDto {
  /**
   * memberId
   * @example 2
   */
  @IsInt()
  @IsNotEmpty()
  memberId: number;

  /**
   * role
   * @example "admin"
   */
  @IsEnum(BoardMemberType)
  @IsNotEmpty()
  role: BoardMemberType;
}
