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
import { MoveCardDto } from "./dto/moveCard.dto";
import _ from "lodash";

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
    const { cardOrder, colum_id, title, desc, color } = createCardDto;

    const newCard = this.cardRepository.create({
      colum_id,
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
      colum_id: card.colum_id,
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

  async updateCard(updateCardDto: UpdateCardDto, cardId: number) {
    const { title, colum_id, desc, color } = updateCardDto;
    const card = await this.cardRepository.findOne({
      where: {
        colum_id,
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

  async assignCardToUser(cardId: number, UserId: number): Promise<void> {
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

  async unassignCardFromUser(cardId: number, userId: number): Promise<void> {
    await this.worker_Repository.delete({
      card: { id: cardId },
      user: { id: userId },
    });
  }

  async deleteCard(cardId: number): Promise<void> {
    await this.cardRepository.delete(cardId);
  }

 async moveCard({id, colum_id}: MoveCardDto) {
  console.log(id, colum_id)
  const card = await this.cardRepository.findOne({
    where: {
      id
    }
  })
  console.log('card?', card)
  if(_.isNil(card)) {
    throw new BadRequestException('유효하지 않은 요청입니다.')
  }
  
  card.colum_id = colum_id

  const relocatedCard = await this.cardRepository.save(card)

  return relocatedCard
 }
 

  
}
