import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { Colum } from "../colum/entities/colum.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Colum])],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
