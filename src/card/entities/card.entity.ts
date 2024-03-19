import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// import { Board } from '../board/board.entity';
// import { Comment } from '../comment/comment.entity';

@Entity("card")
export class Card {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  @ApiProperty({ example: 1, description: "id" })
  id: number;

  @IsNumber()
  @Column({ type: "int", default: 1 })
  @ApiProperty({ example: 1, description: "cardOrder" })
  cardOrder: number;

  @IsNotEmpty({ message: "카드 명을 입력해 주세요." })
  @IsString()
  @Column({ type: "varchar" })
  @ApiProperty({ example: "펩시제로1", description: "title" })
  title: string;

  @IsString()
  @Column({ type: "varchar", nullable: true })
  @ApiProperty({ example: "펩시 제로콜라", description: "desc" })
  desc: string;

  @IsString()
  @Column({ type: "varchar", nullable: true })
  @ApiProperty({ example: "black", description: "color" })
  color: string;

  @CreateDateColumn({ update: false })
  @ApiProperty({
    example: "2024-03-19 06:14:10.769099",
    description: "createdAt",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: "2024-03-19 10:52:42.000000",
    description: "updatedAt",
  })
  updatedAt: Date;

  // @OneToMany(()=>Comment,(comment)=>comment.card)
  // comment:Comment[];

  // @ManyToOne(()=>Worker,(worker)=>worker.cards)
  // worker:Worker;
}
