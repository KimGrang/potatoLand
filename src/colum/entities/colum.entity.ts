import { IsNumber, IsNotEmpty, IsString, IsInt } from "class-validator";
import { Board } from "src/board/entities/board.entity";
import { Card } from "src/card/entities/card.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity('colum')
export class Colum {
  
  /**
   * 컬럼 id
   * @example 1
   */
  @IsNumber()
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  /**
   * 컬럼 번호
   * @example 2
   */
  @IsNumber()
  @Column({default: 1})
  columOrder?: number;

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
  @JoinColumn({name: 'board_id', referencedColumnName: 'id'})
  board: Board | null;

  @IsInt()
  @Column({unsigned: true})
  board_id: number;
}
