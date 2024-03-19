import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleValidationSchema } from 'configs/envValidation.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from 'configs/database.config';
<<<<<<< HEAD
import { ColumModule } from './colum/colum.module';
=======
import { UserModule } from './user/user.module';
>>>>>>> 1ebc8bd5cc4c417a5765b60fc534c42d5057dc9a

@Module({
  imports: [ConfigModule.forRoot({
  isGlobal: true, validationSchema: configModuleValidationSchema
  }),
  TypeOrmModule.forRootAsync(typeOrmModuleOptions),
<<<<<<< HEAD
  ColumModule
=======
  UserModule
>>>>>>> 1ebc8bd5cc4c417a5765b60fc534c42d5057dc9a
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
