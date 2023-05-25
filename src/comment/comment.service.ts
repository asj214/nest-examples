import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCommentDto, CommentDto, UpdateCommentDto } from './dto/comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async findAll(query: SearchCommentDto) {
    const { take, skip, commentableId, commentableType } = query;
    const [data, count] = await this.commentRepository.findAndCount({
      relations: ['user'],
      where: {
        commentableType: commentableType,
        commentableId: commentableId
      },
      order: {
        id: 'DESC'
      },
      take: take,
      skip: skip
    })

    return {
      count: count,
      data: data
    }
  }

  async create(user, dto: CommentDto) {
    const comment = new Comment();
    comment.commentableId = dto.commentableId;
    comment.commentableType = dto.commentableType;
    comment.body = dto.body;
    comment.user = user;

    return await this.commentRepository.save(comment);
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      relations: ['user'],
      where: {
        id: id
      }
    });

    if (!comment) throw new NotFoundException();

    return comment;
  }

  async update(id: number, user, dto: UpdateCommentDto) {
    const comment = await this.findOne(id);

    if (comment.user.id !== user.id) {
      throw new NotAcceptableException();
    }

    await this.commentRepository.update(id, dto);

    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.commentRepository.softDelete({ id: id });
  }
}
