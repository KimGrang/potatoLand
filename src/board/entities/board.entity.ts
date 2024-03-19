import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoardVisibility } from "../types/boardVisibility.type";
import { IsDate, IsEnum, IsInt, IsString } from "class-validator";
import { BoardMember } from "./boardMember.entity";
import { User } from "./user.entity.temp";
import { InviteOption } from "../types/inviteOption.type";
@Entity({
  name: "board",
})
export class Board {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: "varchar", length: 50 })
  name: string;

  @IsString()
  @Column({ type: "varchar", length: 100, nullable: true })
  description: string;

  @IsString()
  @Column({ type: "varchar", length: 7 })
  backgroundColor: string; // #FFFFFF

  @IsEnum(BoardVisibility)
  @Column({
    type: "enum",
    enum: BoardVisibility,
    default: BoardVisibility.PUBLIC,
  })
  visibility: BoardVisibility;

  @IsEnum(InviteOption)
  @Column({
    type: "enum",
    enum: InviteOption,
    default: InviteOption.ALL_MEMBER,
  })
  inviteOption: InviteOption;

  @ManyToOne(() => User, (user) => user.boards)
  createdBy: User;

  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;

  @IsDate()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => BoardMember, (boardMember) => boardMember.board)
  members: BoardMember[];
}
