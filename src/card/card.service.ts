import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const { ...restOfCard } = createCardDto;

    const existedCard = await this.cardRepository.findOneBy({
      title: createCardDto.title,
    });

    if (existedCard) {
      throw new BadRequestException("이미 사용 중인 공연명입니다.");
    }

    const card = await this.cardRepository.save({
      ...restOfCard,
    });
    return card;
  }

  async update(id: number, cardDto: UpdateCardDto): Promise<Card> {
    await this.cardRepository.update(id, cardDto);
    return this.cardRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }

  async move(id: number, newPosition: number): Promise<void> {
    await this.cardRepository.update(id, { cardOrder: newPosition });
  }

  // async moveBetweenColumns(id: number, newColumnId: number): Promise<void> {
  //   await this.cardRepository.update(id, { columnId: newColumnId });
  // }
}
