import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [BooksModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
