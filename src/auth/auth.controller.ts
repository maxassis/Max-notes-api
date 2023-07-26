import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  // @Post('me')
  // async me(@Headers('authorization') token) {
  //   console.log(token.split(' ')[1]);
  //   return this.authService.checkToken((token ?? '').split(' ')[1]);
  // }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req) {
    const {sub} = await req.tokenPayLoad;
    //console.log(sub);
    
    

    return {
      data: await req.tokenPayLoad,
    };
  }
}
