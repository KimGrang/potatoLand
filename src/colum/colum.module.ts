import { Module } from '@nestjs/common';
import { ColumService } from './colum.service';
import { ColumController } from './colum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colum } from './entities/colum.entity';
import { Comment } from '../comment/entities/comment.entity'
import { BoardMember } from '../board/entities/boardMember.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colum, Comment, BoardMember])],
  controllers: [ColumController],
  providers: [ColumService],
  exports: [ColumService]
})
export class ColumModule {}
