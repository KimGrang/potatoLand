import { Test, TestingModule } from "@nestjs/testing";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { User } from "../user/entity/user.entity";
import {
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateBoardDto } from "./dto/createBoard.dto";
import { Board } from "./entities/board.entity";
import { BoardMember } from "./entities/boardMember.entity";
import { BoardMemberType } from "./types/boardMember.type";
import { BoardVisibility } from "./types/boardVisibility.type";
import { InviteOption } from "./types/inviteOption.type";
import { InviteBoardDto } from "./dto/inviteBoard.dto";
import { UpdateBoardDto } from "./dto/updateBoard.dto";
import { UpdateMemberDto } from "./dto/updateMember.dto";
import { DeleteMemberDto } from "./dto/deleteMember.dto";

describe("BoardController", () => {
  let boardController: BoardController;

  const boardService = {
    createBoard: jest.fn(),
    deleteBoard: jest.fn(),
    updateBoard: jest.fn(),
    invite: jest.fn(),
    confirm: jest.fn(),
    getBoardById: jest.fn(),
    updateMemberRole: jest.fn(),
    deleteMember: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: boardService,
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    boardController = module.get<BoardController>(BoardController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(boardController).toBeDefined();
  });

  /////////////////////////// variables /////////////////////////////////////

  const user = {
    id: 1,
    email: "test@test.com",
    password: "testing0*",
    name: "test",
  } as User;

  const boardMember = {
    id: 1,
    role: BoardMemberType.ADMIN,
    user,
  } as BoardMember;

  const secondUser = {
    id: 2,
    email: "test2@test.com",
    password: "testing0*",
    name: "test2",
  } as User;

  const secondBoardMember = {
    id: 2,
    role: BoardMemberType.MEMBER,
    user: secondUser,
  } as BoardMember;

  const board = {
    id: 1,
    name: "test",
    description: "test",
    backgroundColor: "cornflowerblue",
    visibility: BoardVisibility.PRIVATE,
    inviteOption: InviteOption.ALL_MEMBER,
    createdBy: user,
    members: [boardMember, secondBoardMember],
  } as Board;

  const mockUser = {
    id: 999,
    email: "test999@test.com",
    password: "testing0*",
    name: "test999",
  } as User;

  ////////////////////////////////////////////////////////////////////////////

  describe("createBoard test", () => {
    it("should create a board and return message", async () => {
      const newBoard = { ...board, members: [boardMember] } as Board;

      const createBoardDto = {
        name: "test",
        backgroundColor: "cornflowerblue",
        description: "test",
        visibility: BoardVisibility.PRIVATE,
        inviteOption: InviteOption.ALL_MEMBER,
      } as CreateBoardDto;

      boardService.createBoard.mockResolvedValue(newBoard);

      // act
      const result = await boardController.createBoard(user, createBoardDto);

      // assert
      expect(boardService.createBoard).toHaveBeenCalledTimes(1);
      expect(boardService.createBoard).toHaveBeenCalledWith(
        user,
        createBoardDto,
      );
      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: "보드가 생성되었습니다.",
        board: newBoard,
      });
    });

    it("should throw InternalServerError if dto is wrong", async () => {
      boardService.createBoard.mockRejectedValue(InternalServerErrorException);

      await expect(
        boardController.createBoard(user, undefined),
      ).rejects.toThrow();
    });
  });

  describe("invite test", () => {
    it("should invite a specified user to board and return message", async () => {
      const inviteBoardDto = {
        userId: 3,
        role: BoardMemberType.MEMBER,
        expiresIn: 12,
      } as InviteBoardDto;

      boardService.invite.mockResolvedValue({
        message: "초대 링크가 해당 사용자의 이메일로 전송되었습니다.",
      });

      // act
      const result = await boardController.invite(user, 1, inviteBoardDto);

      // assert
      expect(boardService.invite).toHaveBeenCalledTimes(1);
      expect(boardService.invite).toHaveBeenCalledWith(user, 1, inviteBoardDto);
      expect(result).toEqual({
        message: "초대 링크가 해당 사용자의 이메일로 전송되었습니다.",
      });
    });

    it("should throw InternalServerError if dto is wrong", async () => {
      boardService.invite.mockRejectedValue(InternalServerErrorException);

      await expect(
        boardController.invite(user, 1, undefined),
      ).rejects.toThrow();
    });
  });

  describe("confirm test", () => {
    it("should confirm and put a specified user to boardMember", async () => {
      const token = "jwt-token";

      boardService.confirm.mockResolvedValue({
        message: `1번 보드에 초대되셨습니다.`,
      });

      // act
      const result = await boardController.confirm(token);

      // assert
      expect(boardService.confirm).toHaveBeenCalledTimes(1);
      expect(boardService.confirm).toHaveBeenCalledWith(token);
      expect(result).toEqual({
        message: `1번 보드에 초대되셨습니다.`,
      });
    });

    it("should throw UnauthorizedException if token from query is invalid", async () => {
      const falseToken = "false-jwt-token";

      boardService.confirm.mockRejectedValue(UnauthorizedException);

      await expect(boardController.confirm(falseToken)).rejects.toThrow();
    });
  });

  describe("updateBoard test", () => {
    const updateBoardDto = {
      backgroundColor: "magenta pink",
    } as UpdateBoardDto;

    it("should update a specified board and return message", async () => {
      boardService.updateBoard.mockResolvedValue({
        message: "성공적으로 수정되었습니다",
      });

      // act
      const result = await boardController.updateBoard(user, 1, updateBoardDto);

      // assert
      expect(boardService.updateBoard).toHaveBeenCalledTimes(1);
      expect(boardService.updateBoard).toHaveBeenCalledWith(
        user,
        1,
        updateBoardDto,
      );
      expect(result).toEqual({
        message: "성공적으로 수정되었습니다",
      });
    });

    it("should throw InternalServerError if dto is wrong", async () => {
      boardService.updateBoard.mockRejectedValue(InternalServerErrorException);

      await expect(
        boardController.updateBoard(user, 1, undefined),
      ).rejects.toThrow();
    });
  });

  describe("deleteBoard test", () => {
    it("should delete a specified board and return message", async () => {
      boardService.deleteBoard.mockResolvedValue({
        message: "보드에서 해당 멤버가 삭제되었습니다.",
      });

      // act
      const result = await boardController.deleteBoard(user, 1);

      // assert
      expect(boardService.deleteBoard).toHaveBeenCalledTimes(1);
      expect(boardService.deleteBoard).toHaveBeenCalledWith(user, 1);
      expect(result).toEqual({
        message: "보드에서 해당 멤버가 삭제되었습니다.",
      });
    });

    it("should throw InternalServerError if id from parameter is wrong", async () => {
      const falseId = Number("false"); // Number(undefined);

      boardService.deleteBoard.mockRejectedValue(InternalServerErrorException);

      await expect(boardController.deleteBoard(user, 1)).rejects.toThrow();
    });
  });

  describe("getBoardById test", () => {
    it("should return a specified board with given data", async () => {
      boardService.getBoardById.mockResolvedValue(board);

      // act
      const result = await boardController.getBoardById(user, 1);

      // assert
      expect(boardService.getBoardById).toHaveBeenCalledTimes(1);
      expect(boardService.getBoardById).toHaveBeenCalledWith(user, 1);
      expect(result).toEqual(board);
    });

    it("should throw InternalServerError if id from parameter is wrong", async () => {
      const falseId = Number("false"); // Number(undefined);

      boardService.getBoardById.mockRejectedValue(InternalServerErrorException);

      await expect(boardController.getBoardById(user, 1)).rejects.toThrow();
    });
  });

  describe("updateMemberRole test", () => {
    const updateMemberDto = {
      memberId: 2,
      role: BoardMemberType.ADMIN,
    } as UpdateMemberDto;

    it("should update a specified boardMember and return message", async () => {
      boardService.updateMemberRole.mockResolvedValue({
        message: `해당 멤버의 권한이 admin(으)로 변경되었습니다.`,
      });

      // act
      const result = await boardController.updateMemberRole(
        user,
        1,
        updateMemberDto,
      );

      // assert
      expect(boardService.updateMemberRole).toHaveBeenCalledTimes(1);
      expect(boardService.updateMemberRole).toHaveBeenCalledWith(
        user,
        1,
        updateMemberDto,
      );
      expect(result).toEqual({
        message: `해당 멤버의 권한이 admin(으)로 변경되었습니다.`,
      });
    });

    it("should throw InternalServerError if dto is wrong", async () => {
      boardService.updateMemberRole.mockRejectedValue(
        InternalServerErrorException,
      );

      await expect(
        boardController.updateMemberRole(user, 1, undefined),
      ).rejects.toThrow();
    });
  });

  describe("deleteMember test", () => {
    const deleteMemberDto = {
      memberId: 2,
    } as DeleteMemberDto;

    it("should delete a specified member from board and return message", async () => {
      boardService.deleteMember.mockResolvedValue({
        message: "보드에서 해당 멤버가 삭제되었습니다.",
      });

      // act
      const result = await boardController.deleteMember(
        user,
        1,
        deleteMemberDto,
      );

      // assert
      expect(boardService.deleteMember).toHaveBeenCalledTimes(1);
      expect(boardService.deleteMember).toHaveBeenCalledWith(
        user,
        1,
        deleteMemberDto,
      );
      expect(result).toEqual({
        message: "보드에서 해당 멤버가 삭제되었습니다.",
      });
    });

    it("should throw InternalServerError if dto is wrong", async () => {
      boardService.deleteMember.mockRejectedValue(InternalServerErrorException);

      await expect(
        boardController.deleteMember(user, 1, undefined),
      ).rejects.toThrow();
    });
  });
});
