import { IsNumber, IsNotEmpty, IsString } from "class-validator";
import { Board } from "src/board/entities/board.entity";
import { Card } from "src/card/entities/card.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";

@Entity('colum')
export class Colum {
  
  /**
   * 컬럼 id
   * @example 1
   */
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @IsNumber()
  @Column({default: 0})
  boardId: number;

  /**
   * 컬럼 번호
   * @example 2
   */
  @IsNumber()
  @IsNotEmpty({message: '컬럼 번호를 입력해 주세요.'})
  @Column()
  columOrder: number;

  /**
   * 컬럼 이름
   * @example "국밥"
   */
  @IsString()
  @IsNotEmpty({message: '제목을 입력해 주세요.'})
  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Card, card => card.colum)
  card: Card[]

  @ManyToOne(()=> Board, board => board.colum, {onDelete: 'CASCADE'})
  board: Board;
  
}