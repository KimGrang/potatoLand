import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto, UpdateCardDto, ReorderCardsDto } from "./dto/card.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Card")
@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: "카드 생성" })
  @Post()
  async createCard(@Body() createCardDto: CreateCardDto) {
    const newCard = await this.cardService.createCard(createCardDto);
    return { message: "카드가 성공적으로 생성되었습니다.", data: { newCard } };
  }

  @ApiOperation({ summary: "모든 카드 정보 확인" })
  @Get()
  async getCard() {
    const cards = await this.cardService.getCards();
    return { message: "모든 카드 정보.", data: { cards } };
  }

  @ApiOperation({ summary: "카드 상세정보 확인" })
  @Get(":id")
  async getCardDetails(@Param("id") cardId: number) {
    const cardDetails = await this.cardService.getCardDetails(cardId);
    return { message: "카드의 상세정보를 읽어왔습니다.", data: cardDetails };
  }

  @ApiOperation({ summary: "카드들 재정렬" })
  @Patch("reorder")
  async reorderCards(@Body() reorderCardsDto: ReorderCardsDto) {
    await this.cardService.reorderCards(reorderCardsDto);
    return { message: "카드가 성공적으로 재정렬 되었습니다." };
  }

  @ApiOperation({ summary: "카드 상세정보 수정" })
  @Patch(":id")
  async updateCard(
    @Param("id") cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    const updatedCard = await this.cardService.updateCard(
      updateCardDto,
      cardId,
    );
    return { message: "카드가 성공적으로 수정되었습니다.", data: updatedCard };
  }

  @ApiOperation({ summary: "카드 삭제" })
  @Delete(":id")
  async deleteCard(@Param("id") cardId: number) {
    await this.cardService.deleteCard(cardId);
    return { message: "카드가 성공적으로 삭제되었습니다" };
  }

  // @ApiOperation({ summary: "카드 (컬럼?보드?) 이동" })
  // @Patch('move')
  // async moveCard(@Body() moveCardDto: MoveCardDto) {
  //   await this.cardService.moveCard(moveCardDto);
  //   return { message: '카드가 성공적으로 이동되었습니다' };
  // }
}
