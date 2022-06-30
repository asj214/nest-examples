import { Controller, Get, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiOperation({ summary: '회원 가입', description: '회원 가입 API' })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() authRegisterDto: AuthRegisterDto) {
    return new User(await this.authService.create(authRegisterDto));
  }

  @Post('login')
  @ApiOperation({ summary: '사용자 인증', description: '사용자 인증 API' })
  @UseInterceptors(ClassSerializerInterceptor)
  async authenticate(@Body() authLoginDto: AuthLoginDto) {
    let user = await this.authService.authenticate(authLoginDto);
    user = Object.assign(user, { token: this.authService.generateJWT(user) });
    return new User(user);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Request() req: any) {
    return new User(req.user);
  }
}
