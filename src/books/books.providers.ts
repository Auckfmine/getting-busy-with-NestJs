/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Book } from './entities/book.entity';

export const booksProvider = [
  {
    provide: 'BOOKS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Book),
    inject: ['DATABASE_CONNECTION'],
  },
];
