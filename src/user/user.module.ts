import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AwsService } from "../awss3/aws.service";

@Module({
  imports: [ //외부 모듈, nest 모듈 
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_ACCESS_TOKEN_SECRET"),
        signOptions: {
          expiresIn: "1800s",
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, AwsService], //모듈에서 사용하는 service
  controllers: [UserController],
  exports : [UserService, TypeOrmModule.forFeature([User])] //외부에서 사용하도록 공개
})
export class UserModule {}
