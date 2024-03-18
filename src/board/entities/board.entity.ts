import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BoardType } from '../types/board.type';
import { Invite } from './invite.entity';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';
@Entity({
  name: 'board',
})
export class Board {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @IsString()
  @Column({ type: 'text', length: 100, nullable: true })
  description: string;

  @IsString()
  @Column({ type: 'varchar', length: 7 })
  backgroundColor: string; // #FFFFFF

  @IsEnum(BoardType)
  @Column({ type: 'enum', enum: BoardType, default: BoardType.public })
  status: BoardType;

  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;

  @IsDate()
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => Invite, (invite) => invite.board)
  invites: Invite[];
}
