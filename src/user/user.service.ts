import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as nodemailer from 'nodemailer'; 
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository : Repository<User>,
    private readonly jwtService : JwtService,
    private readonly configService: ConfigService,
    @InjectRedis()
    private readonly redisClient: Redis,
  ) {}

  async findByEmail(email : string) {
    return await this.userRepository.findOneBy({email});
  }

  async checkEmail(uuid : string) {
    const user = await this.userRepository.findOneBy({emailYnCode : uuid});
    user.emailYn = 'T';
    await this.userRepository.save(user);
  }

  async signUp(signupDto : SignUpDto) {
    if (signupDto.password !== signupDto.confirmPassword) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }
    if (await this.findByEmail(signupDto.email)) {
      throw new ConflictException('이미 가입된 이메일 입니다.');
    };

    const uuid = uuidv4().split('-')[0];
    const user = await this.userRepository.save({
      email : signupDto.email,
      password : await hash(signupDto.password, 10),
      name : signupDto.name,
      emailYn : 'F',
      emailYnCode : uuid
    });

    await this.sendConfirmationEmail(signupDto.email, uuid);

    return user;
  }

  async signIn(signinDto : SignInDto) {
    const user = await this.userRepository.findOne({
      select : ['id', 'email', 'password'],
      where : {email : signinDto.email}
    });

    if (_.isNull(user)) {
      throw new UnauthorizedException('이메일을 확인하세요.');
    }
    if (user.emailYn === 'F') {
      throw new UnauthorizedException('이메일 인증을 완료하세요');
    }
    if (!(await compare(signinDto.password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인하세요.');
    }

    const payload = {email : signinDto.email, sub : user.id};

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret : this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn : '604800s'
    });
    console.log('this.redisClient?', this.redisClient)
    const log = await this.redisClient.set(user.id.toString(), refreshToken, 'EX', '604800'); 
    console.log('log?', log)
    //EX 옵션을 사용하여 TTL(Time To Live)을 설정, 초단위, 7일
    return accessToken;
  }

  private async sendConfirmationEmail(email: string, uuid : string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS')
      }
    });

    await transporter.sendMail({
      from: this.configService.get<string>('GMAIL_USER'),
      to: email,
      subject: '이메일 인증',
      html: `<a href="http://localhost:3000/api/users/email?emailYn=${uuid}">이메일 인증</a>`
    });
  }
}