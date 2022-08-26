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

  async findAll() {
    const [posts, count] = await this.postRepository.findAndCount({
      relations: {
        user: true,
      },
      order: {
        id: 'DESC'
      }
    });

    return { results: posts, count: count }
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

    const toUpdate = Object.assign(post, dto)
    await this.postRepository.save(toUpdate)
    return toUpdate
    return await this.postRepository.update(id, dto);
  }

  async remove(id: number) {
    return await this.postRepository.softDelete({ id: id });
  }
}
