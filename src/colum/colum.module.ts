import { Module } from '@nestjs/common';
import { ColumService } from './colum.service';
import { ColumController } from './colum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colum } from './entities/colum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Colum])],
  controllers: [ColumController],
  providers: [ColumService],
  exports: [ColumService]
})
export class ColumModule {}
