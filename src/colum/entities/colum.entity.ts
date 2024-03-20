import { IsNumber, IsNotEmpty, IsString } from "class-validator";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Entity } from "typeorm";

@Entity('colum')
export class Colum {
  
  /**
   * 컬럼 id
   * @example 1
   */
  @PrimaryGeneratedColumn()
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
  
}