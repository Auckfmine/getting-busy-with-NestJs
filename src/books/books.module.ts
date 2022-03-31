import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { booksProvider } from './books.providers';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from 'src/user/user.providers';
import { OrderProviders } from 'src/order/order.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [
    ...booksProvider,
    ...userProviders,
    ...OrderProviders,
    BooksService,
  ],
})
export class BooksModule {}
