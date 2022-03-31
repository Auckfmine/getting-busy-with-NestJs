import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderProviders } from './order.providers';
import { DatabaseModule } from 'src/database.module';
import { booksProvider } from 'src/books/books.providers';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [DatabaseModule, BooksModule],
  controllers: [OrderController],
  providers: [...OrderProviders, ...booksProvider, OrderService],
})
export class OrderModule {}
