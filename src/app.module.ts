import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule, AuthModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
