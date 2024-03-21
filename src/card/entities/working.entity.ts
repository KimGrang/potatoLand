import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "./card.entity";
import { User } from "../../user/entity/user.entity";

@Entity("working")
export class Working {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Card, (card) => card.working)
  card: Card;

  @ManyToOne(() => User)
  user: User;
}
