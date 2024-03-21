import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { UserInfo } from './decorator/userInfo.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from '../awss3/aws.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService : UserService
  ) {}

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
      access_token: await this.userService.signIn(SignInDto)
    })
  }

  @UseGuards(RolesGuard)
  @Post('test')
  async test(@UserInfo() user : User, @Res() res : Response) {
    console.log(user.id);
    return res.status(HttpStatus.OK).json({
      message: "test되면 안되는데"
    })
  }

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(RolesGuard)
  @Post('profile')
  @ApiOperation({ summary: '프로필 API', description: '프로필을 수정한다.' })
  async profile(@UploadedFile() file: Express.Multer.File, 
                @Res() res : Response, 
                @Body() updateProfileDto : UpdateProfileDto,
                @UserInfo() user : User) {
    
    return res.status(HttpStatus.OK).json({
      message : "프로필을 수정했습니다.",
      user : await this.userService.profile(file, updateProfileDto, user)
    })
  }  
}