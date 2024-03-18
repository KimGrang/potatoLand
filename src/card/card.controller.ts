import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Card } from "./entities/card.entity";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    const data = await this.cardService.create(createCardDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: "공연 생성에 성공했습니다.",
      data,
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.cardService.delete(id);
  }

  @Patch(":id/move/:newPosition")
  async move(
    @Param("id") id: number,
    @Param("newPosition") newPosition: number,
  ): Promise<void> {
    return this.cardService.move(id, newPosition);
  }

  // @Patch(":id/move-to-column/:newColumnId")
  // async moveBetweenColumns(
  //   @Param("id") id: number,
  //   @Param("newColumnId") newColumnId: number,
  // ): Promise<void> {
  //   return this.cardService.moveBetweenColumns(id, newColumnId);
  // }
}
