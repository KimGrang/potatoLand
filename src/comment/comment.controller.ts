import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create a new comment for a card' })
  @Post(':cardId')
  async createComment(
    @Param('cardId') cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const newComment =
      await this.commentService.createComment(createCommentDto);
    return { message: 'Comment created successfully', data: newComment };
  }

  @ApiOperation({ summary: 'Update a comment' })
  @Patch(':id')
  async updateComment(
    @Param('id') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentService.updateComment(
      commentId,
      updateCommentDto,
    );
    return { message: 'Comment updated successfully', data: updatedComment };
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @Delete(':id')
  async deleteComment(@Param('id') commentId: number) {
    await this.commentService.deleteComment(commentId);
    return { message: 'Comment deleted successfully' };
  }
}
