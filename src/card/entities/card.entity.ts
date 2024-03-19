import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

// import { Board } from '../board/board.entity';
// import { Comment } from '../comment/comment.entity';

@Entity("card")
export class Card {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @IsNumber()
  @Column({ type: "int", default: 1 })
  cardOrder: number;

  @IsNotEmpty({ message: "카드 명을 입력해 주세요." })
  @IsString()
  @Column({ type: "varchar" })
  title: string;

  @IsString()
  @Column({ type: "varchar", nullable: true })
  desc: string;

  @IsString()
  @Column({ type: "varchar", nullable: true })
  color: string;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(()=>Comment,(comment)=>comment.card)
  // comment:Comment[];

  // @ManyToOne(()=>Worker,(worker)=>worker.cards)
  // worker:Worker;
}
