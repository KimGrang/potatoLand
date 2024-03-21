import { Controller, Post, Body, Patch, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { ColumService } from './colum.service';
import { CreateColumDto } from './dto/createColum.dto';
import { UpdateColumDto } from './dto/updateColum.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveColumDto } from './dto/removeColum.dto';
import { ReorderColumDto } from './dto/reorderColum.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('컬럼')
@UseGuards(RolesGuard)
@Controller('colum')
export class ColumController {
  constructor(private readonly columService: ColumService) {}

  /**
   * 컬럼 생성
   * @param createColumDto
   * @returns
   */
  @Post()
  async create(@Body() createColumDto: CreateColumDto) {
    const data = await this.columService.create(createColumDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '컬럼이 생성되었습니다.',
      data
    } 
  }

/**
 * 컬럼 이름 수정
 * @param updateColumDto
 * @returns
 */
  @Patch('update')
  async update(@Body() updateColumDto: UpdateColumDto) {
    await this.columService.update(updateColumDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '컬럼 이름이 수정되었습니다.',
    }
  }

  /**
   * 컬럼 삭제
   * @param
   * @returns
   */
  @Delete()
  async remove(@Body() removeColumDto:RemoveColumDto ) {
    const {id} = removeColumDto
    await this.columService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: '컬럼이 삭제되었습니다.',
      
    } 
  }
  /**
   * 컬럼 이동
   * @param reorderColumDto
   * @returns
   */
  @Patch('reorder')
  async reorderColum(@Body() reorderColumDto:ReorderColumDto) {
    const data = await this.columService.reorderColum(reorderColumDto)
    
    return {
      statusCode: HttpStatus.OK,
      message: '컬럼 순서가 변경되었습니다.',
      data
    }
  }
}
