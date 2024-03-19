import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { Board } from "./entities/board.entity";
import { User } from "./entities/user.entity.temp";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateBoardDto } from "./dto/updateBoard.dto";
import { InviteBoardDto } from "./dto/inviteBoard.dto";

@ApiTags("Board")
@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: "보드 생성하기" })
  @Post() // (임시) 추후 user을 데코레이터로 받아오게 수정
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    const user = new User();
    user.email = "tntncodus@naver.com";
    user.id = 1;
    user.role = "admin";

    return await this.boardService.createBoard(
      user, // (임시)
      createBoardDto,
    );
  }

  @ApiOperation({ summary: "보드에 초대하기" })
  @Post(":id/invite")
  async invite(
    @Param("id") id: number,
    @Body() inviteBoardDto: InviteBoardDto,
  ) {
    const user = new User();
    user.email = "tntncodus@naver.com";
    user.id = 1;
    user.role = "admin";

    return await this.boardService.invite(user, id, inviteBoardDto);
  }

  @ApiOperation({ summary: "보드 수정하기" })
  @Patch(":id")
  async updateBoard(
    @Param("id") id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const user = new User();
    user.email = "tntncodus@naver.com";
    user.id = 1;
    user.role = "admin";

    return await this.boardService.updateBoard(user, id, updateBoardDto);
  }

  @ApiOperation({ summary: "보드 삭제하기" })
  @Delete(":id")
  async deleteBoard(@Param("id") id: number) {
    const user = new User();
    user.email = "tntncodus@naver.com";
    user.id = 2;
    user.role = "admin";

    return await this.boardService.deleteBoard(user, id);
  }

  @ApiOperation({ summary: "보드 상세 조회하기" })
  @Get(":id")
  async getBoardById(@Param("id") id: number) {
    const user = new User();
    user.email = "tntncodus@naver.com";
    user.id = 2;
    user.role = "guest";

    return await this.boardService.getBoardById(user, id);
  }
}
