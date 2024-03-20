import { PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entity/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'name'] ) { //추후 PartialType 으로 변경
  @IsString()
  @IsNotEmpty({message : '비밀번호를 확인하세요.'})
  confirmPassword : string;
}