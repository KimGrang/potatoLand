import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entity/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'name'] ) {
  
  /**
   * 비밀번호 확인
   * @example "Ex@mple!!123"
   */
  @IsString()
  @IsNotEmpty({message : '비밀번호를 확인하세요.'})
  confirmPassword : string;
}