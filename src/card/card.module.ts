import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Working } from "./entities/working.entity";
import { UserModule } from "../user/user.module";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { Colum } from "../colum/entities/colum.entity";
import { Board } from "../board/entities/board.entity";
import { User } from "../user/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Colum, Board, Working, User]),
    UserModule,
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
