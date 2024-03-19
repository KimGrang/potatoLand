import { IsEmail, IsInt } from "class-validator";
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "./board.entity";

@Entity({
  name: "user",
})
export class User {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar" })
  role: string;

  @OneToMany(() => Board, (Board) => Board.createdBy)
  boards: Board[];
}
