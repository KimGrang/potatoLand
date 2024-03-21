import { Module } from "@nestjs/common";
import { BoardController } from "./board.controller";
import { BoardService } from "./board.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { BoardMember } from "./entities/boardMember.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../user/entity/user.entity";
import { CacheModule } from "@nestjs/cache-manager";
import { cacheModuleOptions } from "../../configs/cache.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardMember, User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET_BOARD"),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync(cacheModuleOptions),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
