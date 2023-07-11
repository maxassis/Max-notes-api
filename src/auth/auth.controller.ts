import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    console.log('heheheh');
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @Post('me')
  async me(@Headers('authorization') token) {
    console.log(token.split(' ')[1])
    return this.authService.checkToken(token.split(' ')[1]);
  }
}
