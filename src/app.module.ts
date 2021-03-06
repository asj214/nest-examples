import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import typeORMConfig from 'ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    AuthModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule {}
