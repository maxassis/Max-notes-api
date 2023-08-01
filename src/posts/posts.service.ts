import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create({ title, content, color, deleted }: CreatePostDto, id: number) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        color,
        userId: id,
        deleted
      },
    });
  }

  findAll(id: number) {
    return this.prisma.post.findMany({
      where: {
        userId: id,
        deleted: false
      },
      orderBy: {
        updatedAt: 'desc',
      }
    });
  }

  searchWord(id: number, word) {
    
    return this.prisma.post.findMany({
      where: {
        userId: id,
        deleted: false,
        OR: [
          {
            title: {
              contains: word.trim(),
            },
          },
          {
            content: {
              contains: word.trim(),
            },
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      }
    })
  }

  findOne(id: number) {
    return this.prisma.post.findFirstOrThrow({
      where: {
        id,
        deleted: false
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

  moveToTrash(id: number) {
    return this.prisma.post.update({
      where: {
        id
      },
      data: {
        deleted: true
      }
    })
  }

  getTrash(id: number) {
    return this.prisma.post.findMany({
      where: {
        userId: id,
        deleted: true
      },
      orderBy: {
        updatedAt: 'desc',
      }
    })
  }


  cleanTrash(id: number) {
    return this.prisma.post.deleteMany({
      where: {
        userId: id,
        deleted: true,
      },
    });

    //return `This action removes a #${id} post`;
  }
}
