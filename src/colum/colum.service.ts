import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColumDto } from './dto/createColum.dto';
import { UpdateColumDto } from './dto/updateColum.dto';
import { Repository } from 'typeorm';
import { Colum } from './entities/colum.entity';
import { InjectRepository } from '@nestjs/typeorm';
import _, { isNil } from 'lodash';

@Injectable()
export class ColumService {
  constructor(@InjectRepository(Colum) private readonly columRepository:Repository<Colum>) {}

  //컬럼 생성
  async create(createColumDto: CreateColumDto) {
    const {columOrder, title} = createColumDto
  //중복 검사: boardId, columOrder를 받아야 할 듯
  const existedColum = await this.columRepository.findOne({
    where:{
    columOrder, title}
  }) 
  if(existedColum) {
    throw new BadRequestException('유효하지 않은 요청입니다.')
  }

    const colum = await this.columRepository.save({
      columOrder, title
    })
    return colum;
  }

  //컬럼 이름 수정
  async update(updateColumDto: UpdateColumDto) {
    const {boardId, title} = updateColumDto
    const existedColum = await this.columRepository.findOne({
      where:{
        boardId, title
      }
    })
    if(existedColum) {
      throw new BadRequestException('유효하지 않은 요청입니다.')
    }
    
    
    return await this.columRepository.update({boardId}, {title})
  }
  //컬럼 삭제
  async remove(id: number) {
    const existedColum = await this.columRepository.findOneBy({id})
    if(isNil(existedColum)) {
      throw new BadRequestException('유효하지 않은 요청입니다.')
    }

    
    return await this.columRepository.delete({id})
  }

  //컬럼 순서 이동
}
