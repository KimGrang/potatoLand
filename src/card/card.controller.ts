import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  // UseInterceptors,
  UseGuards,
  Put,
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
import { ScheduleCardDto } from "./dto/scheduleCard.dto";

@ApiTags("Card")
@UseGuards(RolesGuard)
@Controller("card")
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
    return {
      statusCode: HttpStatus.CREATED,
      message: "카드가 성공적으로 생성되었습니다.",
      data: { newCard },
    };
  }

  @ApiOperation({ summary: "모든 카드 정보 확인" })
  @Get()
  async getCards() {
    const cards = await this.cardService.getCards();
    return {
      statusCode: HttpStatus.OK,
      message: "모든 카드 정보.",
      data: { cards },
    };
  }

  @ApiOperation({ summary: "카드 상세정보 확인" })
  @Get(":id")
  async getCardDetails(@Param("id") cardId: number) {
    const cardDetails = await this.cardService.getCardDetails(cardId);
    return {
      statusCode: HttpStatus.OK,
      message: "카드의 상세정보를 읽어왔습니다.",
      data: cardDetails,
    };
  }

  @ApiOperation({ summary: "카드들 재정렬" })
  @Patch(":boardId/reorder")
  async reorderCards(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Body() reorderCardsDto: ReorderCardsDto,
  ) {
    await this.cardService.reorderCards(user, boardId, reorderCardsDto);
    return {
      statusCode: HttpStatus.OK,
      message: "카드가 성공적으로 재정렬 되었습니다.",
    };
  }

  @ApiOperation({ summary: "카드 상세정보 수정" })
  @Patch(":boardId/:id")
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
    return {
      statusCode: HttpStatus.CREATED,
      message: "카드가 성공적으로 수정되었습니다.",
      data: updatedCard,
    };
  }

  @ApiOperation({ summary: "작업자 할당" })
  @Post(":boardId/:id/createWorking/:userId")
  async createCardWorker_(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("id") cardId: number,
    @Param("userId") userId: number,
  ) {
    await this.cardService.createCardWorker_(user, boardId, cardId, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: "카드에 작업자 할당 완료",
    };
  }

  @ApiOperation({ summary: "작업자 삭제" })
  @Delete(":boardId/:cardId/removeWorking/:userId")
  async removeCardWorker_(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("cardId") cardId: number,
    @Param("userId") userId: number,
  ) {
    await this.cardService.removeCardWorker_(user, boardId, cardId, userId);
    return {
      statusCode: HttpStatus.OK,
      message: "카드에서 작업자 제거 완료",
    };
  }

  @ApiOperation({ summary: "카드 삭제" })
  @Delete(":boardId/:cardId")
  async deleteCard(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Param("cardId") cardId: number,
  ) {
    await this.cardService.deleteCard(user, boardId, cardId);
    return {
      statusCode: HttpStatus.OK,
      message: "카드가 성공적으로 삭제되었습니다",
    };
  }

  @ApiOperation({ summary: "카드 (컬럼?보드?) 이동" })
  @Put(":boardId/move")
  async moveCard(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Body() moveCardDto: MoveCardDto,
  ) {
    await this.cardService.moveCard(user, boardId, moveCardDto);
    return {
      statusCode: HttpStatus.OK,
      message: "카드가 성공적으로 이동되었습니다",
    };
  }

  @Post(':boardId/deadline')
  async scheduleCard(
    @UserInfo() user: User,
    @Param("boardId") boardId: number,
    @Body() scheduleCardDto: ScheduleCardDto
  ) {
    await this.cardService.scheduleCard(user, boardId, scheduleCardDto)
    return {
      statusCode: HttpStatus.CREATED,
      message: "마감일이 등록되었습니다."
    }
  }
}
