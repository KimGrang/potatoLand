import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity.temp";
import { BoardMemberType } from "../types/boardMember.type";

@Entity({
  name: "boardMember",
})
export class BoardMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Board, (board) => board.members, {
    onDelete: "CASCADE",
  })
  board: Board;

  @Column({
    type: "enum",
    enum: BoardMemberType,
    default: BoardMemberType.MEMBER,
  })
  role: BoardMemberType;
}
