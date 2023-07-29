import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create({ title, content, color }: CreatePostDto, id: number) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        color,
        userId: id,
      },
    });
  }

  findAll(id: number) {
    return this.prisma.post.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        updatedAt: 'desc',
      }
    });
  }

  searchWord(id: number, content) {
    
    return this.prisma.post.findMany({
      where: {
        userId: id,
        OR: [
          {
            title: {
              contains: content.trim(),
            },
          },
          {
            content: {
              contains: content.trim(),
            },
          },
        ],
      },
    })
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, { title, content, color }: UpdatePostDto) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        color
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
