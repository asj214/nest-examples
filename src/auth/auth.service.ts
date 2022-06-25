import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async create(dto: AuthRegisterDto) {
    const { email, name, password } = dto;
    const isExist = await this.userRepository.findOne({
      where: {
        email: email
      }
    })

    if (isExist) throw new BadRequestException();

    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;

    return await this.userRepository.save(user);
  }
  async authenticate({ email, password }: AuthLoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (!user) throw new NotFoundException();

    if (!await argon2.verify(user.password, password)) {
      throw new NotFoundException();
    }

    user.lastLoginAt = new Date();
    return await this.userRepository.save(user);

  }

  generateJWT(user: User) {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id: id
      }
    });
  }
}
