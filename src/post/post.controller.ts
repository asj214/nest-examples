import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
@ApiTags('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '게시글 작성', description: '게시글 작성 API' })
  async create(@Request() request, @Body() createPostDto: PostDto) {
    return new PostEntity(await this.postService.create(request.user, createPostDto));
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록', description: '게시글 목록 API' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세', description: '게시글 상세 API' })
  async findOne(@Param('id') id: number) {
    return new PostEntity(await this.postService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '게시글 수정', description: '게시글 수정 API' })
  async update(@Request() request, @Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(request.user, id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '게시글 삭제', description: '게시글 삭제 API' })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
