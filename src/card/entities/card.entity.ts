import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsDate, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Colum } from "../../colum/entities/colum.entity";
import { Working } from "./working.entity";
import { Comment } from "../../comment/entities/comment.entity";

@Entity("card")
export class Card {
  @IsNumber()
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

  @Matches('^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$')
  @Column({type: 'varchar', nullable: true})
  deadline: string;

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

  @ManyToOne(() => Colum, (colum) => colum.card, { onDelete: "CASCADE" })
  @JoinColumn({ name: "colum_id", referencedColumnName: "id" })
  colum: Colum;

  @IsNumber()
  @Column({ unsigned: true })
  colum_id: number;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];

  @OneToMany(() => Working, (working) => working.card)
  working: Working[];
}
