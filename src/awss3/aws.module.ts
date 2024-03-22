import { Module } from "@nestjs/common";
import { AwsService } from "./aws.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports : [AwsService]
})
export class AuthModule {}