import { PickType } from "@nestjs/swagger";
import { User } from "../entity/user.entity";

export class SignInDto extends PickType(User, ['email', 'password']) {}