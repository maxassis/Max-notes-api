import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReqDTO } from 'src/guards/dto/req-dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreatePostDto, @Req() req) {
    const { sub } = await req.tokenPayLoad;
  
    return this.postsService.create(body, sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: ReqDTO) {
    const { sub } = await req.tokenPayLoad;
  // console.log(sub);
    
   return this.postsService.findAll(sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   // console.log("delete")
    return this.postsService.remove(+id);
  }
}
