import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto { //추후 PartialType 으로 변경

  @IsEmail()
  @IsNotEmpty({message : '이메일을 입력해주세요'})
  email : string;

  @IsString()
  @IsNotEmpty({message : '비밀번호를 입력해주세요'})
  password : string;
  
  @IsString()
  @IsNotEmpty({message : '비밀번호를 확인하세요.'})
  comfirmPassword : string;

  @IsString()
  @IsNotEmpty({message : '이름을 작성해주세요'})
  name : string;
}