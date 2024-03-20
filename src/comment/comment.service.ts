// comment.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto, UpdateCommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  /**
   * 댓글 생성
   * @param {number} cardId - 댓글이 달릴 cardId
   * @param {CreateCommentDto} createCommentDto - 생성될 댓글 내용
   * @returns {Promise<Comment>} - return 생성된 댓글
   */
  //  * @param {number} userId - 작성자 (request userId)
  async createComment(
    cardId: number,
    // userId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      comment: createCommentDto.comment,
      card: { id: cardId },
      // author: { id: userId },
    });

    return this.commentRepository.save(comment);
  }

  /**
   * 댓글 수정
   * @param {number} commentId - 수정할 commentId
   * @param {UpdateCommentDto} updateCommentDto - 댓글 수정 Dto
   * @returns {Promise<Comment>} - return 댓글 수정 내용
   * @throws {NotFoundException} - 해당 Id의 댓글이 없을 경우
   */
  async updateComment(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    comment.comment = updateCommentDto.comment;

    return this.commentRepository.save(comment);
  }

  /**
   * 댓글 삭제
   * @param {number} commentId - 삭제할 commentId
   * @returns {Promise<void>}
   * @throws {NotFoundException} - 해당 Id의 댓글이 없을 경우
   */
  async deleteComment(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
