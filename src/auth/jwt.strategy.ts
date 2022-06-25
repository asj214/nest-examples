import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfigs } from 'src/conf/constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigs.secret,
    });
  }

  async validate(payload: any) {
    return await this.authService.findOne(payload.id);
    /*
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      level: payload.level
    };
    */
  }
}