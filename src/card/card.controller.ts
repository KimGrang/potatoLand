import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { User } from "src/user/entity/user.entity";
import { UserInfo } from "src/user/decorator/userInfo.decorator";
import { CardService } from "src/card/card.service";
import {
  CreateCardDto,
  UpdateCardDto,
  ReorderCardsDto,
  MoveCardDto,
} from "src/card/dto/card.dto";
import { RolesGuard } from "src/auth/roles.guard";

@ApiTags("Card")
@UseGuards(RolesGuard)
@Controller("card")
// @UseInterceptors(CacheInterceptor)
// @CacheTTL(30)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: "카드 생성" })
  @Post(":boardId")
  async createCard(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Body() createCardDto: CreateCardDto,
  ) {
    const newCard = await this.cardService.createCard(
      user,
      boardId,
      createCardDto,
    );
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
  async reorderCards(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Body() reorderCardsDto: ReorderCardsDto,
  ) {
    await this.cardService.reorderCards(user, boardId, reorderCardsDto);
    return { message: "카드가 성공적으로 재정렬 되었습니다." };
  }

  @ApiOperation({ summary: "카드 상세정보 수정" })
  @Patch(":id")
  async updateCard(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("id") cardId: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    const updatedCard = await this.cardService.updateCard(
      user,
      boardId,
      updateCardDto,
      cardId,
    );
    return { message: "카드가 성공적으로 수정되었습니다.", data: updatedCard };
  }

  @ApiOperation({ summary: "Assign a card to a user" })
  @Post(":id/createWorking/:userId")
  async assignCardToUser(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("id") cardId: number,
    @Param("userId") userId: number,
  ) {
    await this.cardService.createCardWorker_(user, boardId, cardId, userId);
    return { message: "카드에 작업자 할당 완료" };
  }

  @ApiOperation({ summary: "Unassign a card from a user" })
  @Delete(":id/removeWorking/:userId")
  async unassignCardFromUser(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("id") cardId: number,
    @Param("userId") userId: number,
  ) {
    await this.cardService.removeCardWorker_(user, boardId, cardId, userId);
    return { message: "카드에서 작업자 제거 완료" };
  }

  @ApiOperation({ summary: "카드 삭제" })
  @Delete(":id")
  async deleteCard(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("id") cardId: number,
  ) {
    await this.cardService.deleteCard(user, boardId, cardId);
    return { message: "카드가 성공적으로 삭제되었습니다" };
  }

  @ApiOperation({ summary: "Move Card from one list to another" })
  @Patch("move")
  async moveCard(@Body() moveCardDto: MoveCardDto) {
    await this.cardService.moveCard(moveCardDto);
    return { message: "Card moved successfully" };
  }
}
