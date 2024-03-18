import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Entity("card")
export class Card {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNumber()
  @Column()
  cardOrder: number;

  @IsNotEmpty({ message: "카드 명을 입력해 주세요." })
  @IsString()
  @Column()
  title: string;

  @IsNotEmpty({ message: "업무 명을 입력해 주세요." })
  @IsString()
  @Column({ type: "text" })
  desc: string;

  @IsNotEmpty({ message: "색깔을 입력해 주세요." })
  @IsString()
  @Column()
  color: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
