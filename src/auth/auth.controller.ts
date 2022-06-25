import { Controller, Get, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() authRegisterDto: AuthRegisterDto) {
    return new User(await this.authService.create(authRegisterDto));
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async authenticate(@Body() authLoginDto: AuthLoginDto) {
    let user = await this.authService.authenticate(authLoginDto);
    user = Object.assign(user, { token: this.authService.generateJWT(user) });
    return new User(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Request() req: any) {
    return new User(req.user);
  }
}
