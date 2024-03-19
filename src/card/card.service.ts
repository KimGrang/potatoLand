import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { In, Repository } from "typeorm";
import {
  CreateCardDto,
  CardDetailsDto,
  UpdateCardDto,
  // ReorderCardsDto,
} from "./dto/card.dto";
import { ReorderCardsDto } from "./dto/reorder.dto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async createCard(createCardDto: CreateCardDto) {
    const { cardOrder, title, desc, color } = createCardDto;

    const newCard = this.cardRepository.create({
      cardOrder: cardOrder,
      title: title,
      desc: desc,
      color: color,
    });

    return this.cardRepository.save(newCard);
  }

  async getCards(): Promise<Card[]> {
    const cards = this.cardRepository.find();
    return cards;
  }

  async getCardDetails(cardId: number): Promise<CardDetailsDto> {
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
      },
      // relations: {
      //   comments: true,
      // },
    });

    if (!card) {
      throw new NotFoundException("Card not found");
    }

    const cardDetails: CardDetailsDto = {
      cardOrder: card.cardOrder,
      title: card.title,
      desc: card.desc,
      color: card.color,
      id: card.id,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    };

    return cardDetails;
  }

  async updateCard(updateCardDto: UpdateCardDto, cardId: number) {
    const { title, desc, color } = updateCardDto;
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      throw new NotFoundException("Card not found");
    }

    card.title = title ? title : card.title;
    card.desc = desc ? desc : card.desc;
    card.color = color ? color : card.color;

    return this.cardRepository.save(card);
  }

  async deleteCard(cardId: number): Promise<void> {
    await this.cardRepository.delete(cardId);
  }

  async reorderCards(reorderCardsDto: ReorderCardsDto): Promise<void> {
    const { cardIds } = reorderCardsDto;
    console.log("국밥0  ------", cardIds);
    const cards = await this.cardRepository.find({
      where: {
        id: In(cardIds),
      },
    });
    if (cards.length !== cardIds.length) {
      throw new UnauthorizedException("One or more cards not found");
    }
    console.log("국밥1  ------");
    const ordersMap = cardIds.reduce((map, id, index) => {
      map[id] = index + 1;
      return map;
    }, {});
    console.log("국밥2  ------", ordersMap);
    await Promise.all(
      cards.map((card) => {
        card.cardOrder = ordersMap[card.id];
        console.log("국밥3  ------");
        return this.cardRepository.save(card);
      }),
    );
  }
}
