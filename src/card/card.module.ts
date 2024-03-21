import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { Working } from "./entities/working.entity";
import { UserModule } from "../user/user.module";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Card, Working]), UserModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
