import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor( private readonly userService : UserService ) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입 API', description: '회원가입을 진행한다.' })
  async signUp(@Body() signupDto : SignUpDto, @Res() res : Response) {
    return res.status(HttpStatus.CREATED).json({
      message : "이메일 인증을 완료하세요.",
      user : await this.userService.signUp(signupDto)
    })
  }

  @Get('email')
  @ApiOperation({ summary: '이메일 인증 API', description: '이메일 인증 코드를 확인한다.' })
  async checkEmail(@Query('emailYn') emailYn : string, @Res() res : Response) {
    return res.status(HttpStatus.CREATED).json({
      message : "이메일 인증이 완료되었습니다.",
      user : await this.userService.checkEmail(emailYn)
    })
  }

  @Post('signin')
  @ApiOperation({ summary: '로그인 API', description: '로그인을 진행한다.' })
  async signIn(@Body() SignInDto : SignInDto, @Res() res : Response) {
    return res.status(HttpStatus.OK).json({
      message : "로그인이 완료되었습니다",
      accessToken : await this.userService.signIn(SignInDto)
    })
  }
}