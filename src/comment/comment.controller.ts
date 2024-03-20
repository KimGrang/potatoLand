import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  // UseGuards,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto, UpdateCommentDto } from "./dto/comment.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: "카드에 댓글 생성" })
  @Post(":cardId")
  async createComment(
    @Param("cardId") cardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const newComment = await this.commentService.createComment(
      cardId,
      createCommentDto,
    );
    return { message: "댓글 작성 완료", data: newComment };
  }

  @ApiOperation({ summary: "댓글 수정" })
  @Patch(":id")
  async updateComment(
    @Param("id") commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentService.updateComment(
      commentId,
      updateCommentDto,
    );
    return { message: "댓글 수정 완료", data: updatedComment };
  }

  @ApiOperation({ summary: "댓글 삭제" })
  @Delete(":id")
  async deleteComment(@Param("id") commentId: number) {
    await this.commentService.deleteComment(commentId);
    return { message: "댓글 삭제 완료" };
  }
}
