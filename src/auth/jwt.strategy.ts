import _ from "lodash";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenExpiredException } from "./expired.exception";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    // @InjectRedis()
    // private readonly redisClient : Redis,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, //만료 기간 직접 제어
      secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findByEmail(payload.email);
    if (_.isNil(user)) {
      throw new NotFoundException("해당하는 사용자를 찾을 수 없습니다.");
    }

    // Access Token이 만료되었는지 확인
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp <= currentTime) {
      const refreshToken = await this.redisService
        .getClient()
        .get(user.id.toString());
      if (!refreshToken) {
        throw new UnauthorizedException("Refresh Token이 없습니다."); //로그아웃 시키기
      }

      // 새로운 Access Token 발급
      const newAccessToken = this.jwtService.sign({
        email: user.email,
        sub: user.id,
      });

      // 만료된 Access Token에 대한 예외 발생
      console.log("토큰 만료 - 추후 예외 핸들러로 response 던지기");
      throw new AccessTokenExpiredException(newAccessToken);
    }

    return user; // HTTP 요청 컨텍스트로 return, ExecutionContext 객체를 통해 접근
  }
}
