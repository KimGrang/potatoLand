import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import { Board } from "../src/board/entities/board.entity";
import { BoardMember } from "../src/board/entities/boardMember.entity";
import { User } from "../src/user/entity/user.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: "mysql",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_NAME"),
    entities: [Board, User, BoardMember],
    synchronize: configService.get<boolean>("DB_SYNC"),
    autoLoadEntities: true,
    logging: true,
  }),
};
