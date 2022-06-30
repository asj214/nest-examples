import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  async create(user: User, dto: PostDto) {
    const post = new PostEntity();
    post.title = dto.title;
    post.body = dto.body;
    post.user = user;

    return await this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all post`;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      relations: ['user'],
      where: {
        id: id
      }
    });

    if (!post) throw new NotFoundException();

    return post;
  }

  async update(user: User, id: number, dto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (post.user.id !== user.id) {
      throw new NotAcceptableException();
    }

    return await this.postRepository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
