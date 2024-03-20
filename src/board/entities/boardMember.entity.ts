import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { User } from "../../user/entity/user.entity";
import { BoardMemberType } from "../types/boardMember.type";
import { ApiProperty } from "@nestjs/swagger";

@Entity("boardMember")
export class BoardMember {
  @ApiProperty({
    example: 1,
    description: "id",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @ApiProperty({
    example: { id: 1, email: "aaa@gmail.com" },
    description: "user",
  })
  user: User;

  @ManyToOne(() => Board, (board) => board.members, {
    onDelete: "CASCADE",
  })
  @ApiProperty({
    example: { id: 1, name: "InProgress", backgroundColor: "magenta" },
    description: "board",
  })
  board: Board;

  @Column({
    type: "enum",
    enum: BoardMemberType,
    default: BoardMemberType.MEMBER,
  })
  @ApiProperty({ example: "member", description: "role" })
  role: BoardMemberType;
}
