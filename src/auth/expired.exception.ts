import { UnauthorizedException } from '@nestjs/common';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor(newAccessToken: string) {
    super('Access Token이 만료되었습니다.');
    this.newAccessToken = newAccessToken;
  }

  newAccessToken: string;
}
