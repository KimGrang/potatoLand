
import { Controller, Post, Body, Patch, Delete, HttpStatus, UseInterceptors, UseGuards } from '@nestjs/common';
import { ColumService } from './colum.service';
import { CreateColumDto } from './dto/createColum.dto';
import { UpdateColumDto } from './dto/updateColum.dto';
import { ApiTags } from '@nestjs/swagger';
import { RemoveColumDto } from './dto/removeColum.dto';
import { ReorderColumDto } from './dto/reorderColum.dto';
import { RolesGuard } from '../auth/roles.guard';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { UserInfo } from '../user/decorator/userInfo.decorator';
import { User } from '../user/entity/user.entity';


@ApiTags('컬럼')
@UseGuards(RolesGuard)
@Controller('colum')
@UseInterceptors(CacheInterceptor)
@CacheTTL(30)
export class ColumController {
  constructor(private readonly columService: ColumService) {}

  /**
   * 컬럼 생성
   * @param createColumDto
   * @returns
   */
  @Post()
  async create(@UserInfo() user: User, @Body() createColumDto: CreateColumDto) {
    const data = await this.columService.create(user, createColumDto);
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
  async update(@UserInfo() user: User, @Body() updateColumDto: UpdateColumDto) {
    await this.columService.update(user, updateColumDto);
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
  async remove(@UserInfo() user: User, @Body() removeColumDto:RemoveColumDto ) {
    const {id} = removeColumDto
    await this.columService.remove(user, id);
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
  async reorderColum(@UserInfo() user: User, @Body() reorderColumDto:ReorderColumDto) {
    const data = await this.columService.reorderColum(user, reorderColumDto)
    
    return {
      statusCode: HttpStatus.OK,
      message: '컬럼 순서가 변경되었습니다.',
      data
    }
  }
}
