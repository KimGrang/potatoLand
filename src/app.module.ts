
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleValidationSchema } from 'configs/envValidation.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'configs/database.config';
import { ColumModule } from './colum/colum.module';
import { UserModule } from './user/user.module';
import { CardModule } from "./card/card.module";

@Module({
  imports: [ConfigModule.forRoot({
  isGlobal: true, validationSchema: configModuleValidationSchema
  }),
  TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ColumModule,
  CardModule,
  UserModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
