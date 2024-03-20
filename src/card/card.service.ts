import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { User } from "../user/entity/user.entity";
import { Working } from "./entities/working.entity";
import { In, Repository } from "typeorm";
import {
  CreateCardDto,
  CardDetailsDto,
  UpdateCardDto,
  ReorderCardsDto,
} from "./dto/card.dto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Working)
    private readonly worker_Repository: Repository<Working>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      comments: card.comments,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    };

    return cardDetails;
  }

  async createCardWorker_(cardId: number, UserId: number): Promise<void> {
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        id: UserId,
      },
    });

    if (!card || !user) {
      throw new NotFoundException("User or Card not found");
    }

    const worker_ = this.worker_Repository.create({
      card,
      user,
    });

    await this.worker_Repository.save(worker_);
  }

  async removeCardWorker_(cardId: number, userId: number): Promise<void> {
    await this.worker_Repository.delete({
      card: { id: cardId },
      user: { id: userId },
    });
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
    const cards = await this.cardRepository.find({
      where: {
        id: In(cardIds),
      },
    });
    if (cards.length !== cardIds.length) {
      throw new NotFoundException("해당 Id의 카드를 찾을 수 없습니다.");
    }
    const ordersMap = cardIds.reduce((map, id, index) => {
      map[id] = index + 1;
      return map;
    }, {});
    await Promise.all(
      cards.map((card) => {
        card.cardOrder = ordersMap[card.id];
        return this.cardRepository.save(card);
      }),
    );
  }
}
