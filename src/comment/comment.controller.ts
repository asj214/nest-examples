import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Request,
  HttpCode,
  UsePipes,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { SearchCommentDto, CommentDto, UpdateCommentDto } from './dto/comment.dto';

@Controller('comments')
@ApiTags('comments')
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: '댓글 목록', description: '댓글 목록 API' })
  findAll(@Query() query: SearchCommentDto) {
    return this.commentService.findAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '댓글 작성', description: '댓글 작성 API' })
  create(@Request() request, @Body() dto: CommentDto) {
    return this.commentService.create(request.user, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '댓글 상세', description: '댓글 상세 API' })
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '댓글 수정', description: '댓글 수정 API' })
  update(
    @Param('id') id: number,
    @Request() request,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, request.user, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '댓글 삭제', description: '댓글 삭제 API' })
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
