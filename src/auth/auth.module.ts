import { UserModule } from "src/user/user.module";

import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { RedisModule } from "../redis/redis.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", session: false }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_ACCESS_TOKEN_SECRET"),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    UserModule,
    RedisModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
