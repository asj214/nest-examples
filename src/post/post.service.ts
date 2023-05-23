import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
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

  async findAll(query) {
    const take = query.take || 10
    const skip = query.skip || 0

    /*
    const qb = this.postRepository.createQueryBuilder('post');
    qb.leftJoinAndSelect('post.user', 'user')
    qb.orderBy('post.id', 'DESC');

    const count = await qb.getCount();

    qb.take(take);
    qb.skip(skip);

    const data = await qb.getMany();
    */

    // 질의를 세번하는데 .... 
    const [data, count] = await this.postRepository.findAndCount({
      relations: ['user'],
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

  async create(user: User, dto: PostDto) {
    const post = new PostEntity();
    post.title = dto.title;
    post.body = dto.body;
    post.user = user;

    return await this.postRepository.save(post);
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

  async remove(id: number) {
    return await this.postRepository.softDelete({ id: id });
  }
}
