import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { User } from 'src/user/entities/user.entity';
import { PostEntity } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PostEntity])
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
