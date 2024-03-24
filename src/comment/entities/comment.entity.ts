import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from "../../card/entities/card.entity";
// import { User } from '../auth/user.entity';

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  // @ManyToOne(() => User)
  // author: User;

  @ManyToOne(() => Card, (card) => card.comments, {onDelete: 'CASCADE'})
  card: Card;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
