import { IsString } from "class-validator";

export class ProfileDto {
    @IsString()
    name: string;
  
    @IsString()
    image: string;
}