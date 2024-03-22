import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
