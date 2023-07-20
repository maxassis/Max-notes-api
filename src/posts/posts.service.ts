import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create({ title, content }: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        userId: 3,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      where: {
        userId: 1,
      },
    });
  }

  search() {
    return this.prisma.post.findMany({
      where: {
        userId: 1,
        title: {
          contains: 'primeira',
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, { title, content }: UpdatePostDto) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    // return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });

    //return `This action removes a #${id} post`;
  }
}
