import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoardVisibility } from "../types/boardVisibility.type";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { BoardMember } from "./boardMember.entity";
import { User } from "../../user/entity/user.entity";
import { InviteOption } from "../types/inviteOption.type";
import { ApiProperty } from "@nestjs/swagger";
import { Colum } from "src/colum/entities/colum.entity";


@Entity("board")
export class Board {
  /**
   * id
   * @example 1
   */
  @IsInt()
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * name
   * @example "InProgress"
   */
  @IsString()
  @IsNotEmpty({ message: "보드의 이름을 명시해주세요." })
  @Column({ type: "varchar", length: 50 })
  name: string;

  /**
   * description
   * @example "진행중인 작업들~~"
   */
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "보드에 대한 설명을 작성해주세요." })
  @Column({ type: "varchar", length: 100, nullable: true })
  description: string;

  /**
   * backgroundColor
   * @example "magenta"
   */
  @IsString()
  @IsNotEmpty({ message: "보드의 배경 색을 명시해주세요." })
  @Column({ type: "varchar", length: 10 })
  backgroundColor: string;

  /**
   * visibility
   * @example "public"
   */
  @IsOptional()
  @IsEnum(BoardVisibility)
  @IsNotEmpty({ message: "보드의 타입을 명시해주세요." })
  @Column({
    type: "enum",
    enum: BoardVisibility,
    default: BoardVisibility.PUBLIC,
  })
  visibility: BoardVisibility;

  /**
   * inviteOption
   * @example "all"
   */
  @IsOptional()
  @IsEnum(InviteOption)
  @IsNotEmpty({ message: "초대 가능 옵션을 선택해주세요." })
  @Column({
    type: "enum",
    enum: InviteOption,
    default: InviteOption.ALL_MEMBER,
  })
  inviteOption: InviteOption;

  @ManyToOne(() => User, (user) => user.boards, {onDelete: 'CASCADE'})
  @ApiProperty({
    example: {
      email: "aaa@aaa.com",
      id: 1,
      name: "aaa",
    },
    description: "createdBy",
  })
  createdBy: User;

  @IsDate()
  @CreateDateColumn()
  @ApiProperty({
    example: "2024-03-19T03:19:12.103Z",
    description: "createdAt",
  })
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn()
  @ApiProperty({
    example: "2024-03-19T03:19:12.103Z",
    description: "updatedAt",
  })
  updatedAt: Date;

  @IsDate()
  @DeleteDateColumn()
  @ApiProperty({ example: null, description: "deletedAt" })
  deletedAt: Date;

  @OneToMany(() => BoardMember, (boardMember) => boardMember.board)
  @ApiProperty({
    example: [
      {
        id: 7,
        role: "admin",
        user: {
          id: 1,
          email: "aaa@aaa.com",
        },
      },
      {
        id: 8,
        role: "member",
        user: {
          id: 2,
          email: "bbb@bbb.com",
        },
      },
    ],
    description: "members",
  })
  members: BoardMember[];

  @OneToMany(()=> Colum, colum => colum.board)
  
  colum: Colum[]
}
