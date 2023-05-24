import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from 'src/user/entities/user.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Comment])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
