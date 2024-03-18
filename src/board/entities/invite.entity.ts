import { IsDate, IsEmail, IsInt, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity({
  name: 'invite',
})
export class Invite {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @Column({ type: 'int' })
  boardId: number;

  @IsEmail()
  @Column({ type: 'varchar', length: 50 })
  userEmail: string;

  @IsString()
  @Column({ type: 'varchar' })
  token: string;

  @IsDate()
  @Column({ type: 'datetime' })
  expireDate: Date;

  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @IsInt()
  @Column({ type: 'int', length: 1, default: 0 })
  idUsed: number;

  @ManyToOne(() => Board, (board) => board.invites)
  board: Board;
}
