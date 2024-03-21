import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { Colum } from "../colum/entities/colum.entity";
import { Board } from "../board/entities/board.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Colum, Board])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
