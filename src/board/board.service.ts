import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Board } from "./entities/board.entity";
import { BoardMember } from "./entities/boardMember.entity";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { User } from "./entities/user.entity.temp";
import _ from "lodash";
import { BoardMemberType } from "./types/boardMember.type";
import { UpdateBoardDto } from "./dto/updateBoard.dto";
import { InviteBoardDto } from "./dto/inviteBoard.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardMember)
    private readonly boardMemberRepository: Repository<BoardMember>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createBoard(user: User, createBoardDto: CreateBoardDto) {
    const { name, backgroundColor, description, visibility, inviteOption } =
      createBoardDto;
    const newBoard = await this.boardRepository.save({
      name,
      backgroundColor,
      description,
      visibility,
      inviteOption,
      createdBy: user,
    });

    if (!_.isNil(user)) {
      await this.boardMemberRepository.save({
        board: newBoard,
        user,
        role: BoardMemberType.ADMIN,
      });
    }
    return newBoard;
  }

  async updateBoard(user: User, id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.getBoardAndRelations(id);
    const boardMember = board.members.filter(
      (boardMember) => boardMember.user.id === user.id,
    );

    // 보드의 member, admin, guest만 수정이 가능하다.
    // 보드의 observer이거나, 아예 보드의 멤버가 아니라면 수정 불가능.
    if (boardMember.length === 0 || boardMember[0].role === "observer") {
      throw new ForbiddenException("인가되지 않은 권한입니다.");
    }

    await this.boardRepository.update({ id }, updateBoardDto);
    return { message: "성공적으로 수정되었습니다" };
  }

  async deleteBoard(user: User, id: number) {
    const board = await this.getBoardAndRelations(id);

    // 생성한 사용자만 삭제 가능.
    if (board.createdBy.id != user.id) {
      throw new ForbiddenException("인가되지 않은 권한입니다.");
    }

    await this.boardRepository.softDelete({ id });

    return { message: "성공적으로 삭제되었습니다." };
  }

  async getBoardById(user: User, id: number) {
    const board = await this.getBoardAndRelations(id);
    const boardMember = board.members.filter(
      (boardMember) => boardMember.user.id === user.id,
    );

    // board visibility가 public이면 누구나 조회 가능, private이면 보드의 멤버만 조회 가능
    if (board.visibility === "private" && boardMember.length === 0) {
      throw new ForbiddenException("인가되지 않은 권한입니다.");
    }

    return board;
  }

  async invite(user: User, id: number, inviteBoardDto: InviteBoardDto) {
    const board = await this.getBoardAndRelations(id);
    const boardMember = board.members.filter(
      (boardMember) => boardMember.user.id === user.id,
    );

    // 보드의 inviteOption이 all이면 보드의 멤버 누구나 초대 가능, adminOnly면 보드의 관리자만 초대 가능
    if (
      boardMember.length === 0 ||
      (board.inviteOption === "adminOnly" && boardMember[0].role !== "admin")
    ) {
      throw new ForbiddenException("인가되지 않은 권한입니다.");
    }

    const { userId, role, expiresIn } = inviteBoardDto;
    const payload = { userId, role, boardId: id };
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  async getBoardAndRelations(id: number) {
    const board = await this.boardRepository
      .createQueryBuilder("board")
      .leftJoinAndSelect("board.createdBy", "createdBy")
      .leftJoinAndSelect("board.members", "members")
      .leftJoinAndSelect("members.user", "user")
      .where("board.id = :id", { id })
      .getOne();

    if (_.isNil(board)) {
      throw new NotFoundException(
        "해당 요청에 필요한 결과를 찾을 수 없습니다.",
      );
    }
    return board;
  }
}
