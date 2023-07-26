import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accesstoken: this.jwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '1 week',
          issuer: 'login',
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {

    try {
      const user = await this.userService.create(data);
      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException('This email is already registered', { cause: new Error(), description: 'This email is already registered' })
    }

  }
}
