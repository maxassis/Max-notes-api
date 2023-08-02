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
    
   return this.postsService.findAll(sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  async search(@Req() req: ReqDTO, @Param('id') id: string) {
    const { sub } = await req.tokenPayLoad;

    if(id === "") {
      return []
    }
    
    return this.postsService.searchWord(sub, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postsService.update(+id, body);
  }

  @UseGuards(AuthGuard)
  @Patch('trash/:id')
  moveToTrash(@Param('id') id: string) {
    return this.postsService.moveToTrash(+id);
  }

  @UseGuards(AuthGuard)
  @Get('trash/:id')
  async getTrash(@Param('id') id: string) {
   return this.postsService.getTrash(+id)
  }

  @UseGuards(AuthGuard)
  @Post('clean/:id')
  async removeAll(@Param('id') id: string) {
    console.log(id);
    
  return this.postsService.cleanTrash(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.postsService.restore(+id);
  }



}
