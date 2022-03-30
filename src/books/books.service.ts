import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: Repository<Book>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    return this.booksRepository.save(createBookDto);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number) {
    try {
      const book = await this.booksRepository.findOne({ id });
      if (!book) {
        return new HttpException('book not found', HttpStatus.NOT_FOUND);
      }
      return book;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    try {
      const book: Book = await this.booksRepository.findOne(id);
      if (!book) {
        return new HttpException(
          `book with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.booksRepository.remove(book);
    } catch (error) {
      return new HttpException(error.message, 404);
    }
  }

  async assignOwnerToBook(bookId: number, authorId: number) {
    try {
      const book: Book = await this.booksRepository.findOne({ id: bookId });
      const owner: User = await this.userRepository.findOne({ id: authorId });
      if (!book || !owner)
        () =>
          new HttpException(
            'either book or user not found, in this case we cant assign',
            HttpStatus.FORBIDDEN,
          );
      book.author = owner;
      console.log(book);
      return await this.booksRepository.save(book);
    } catch (error) {
      return new HttpException(
        'oops something went wrong please retry in few seconds',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async addBookAndAssignBookToAuthor(
    createBookDto: CreateBookDto,
    authorID: number,
  ) {
    try {
      //check for author existance
      const author: User = await this.userRepository.findOne({ id: authorID });
      if (!author) {
        return new HttpException(
          `user with id : ${authorID} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      //asign the book to the owner
      const book: Book = new Book();
      book.author = author;
      book.description = createBookDto.description;
      book.pagesCount = createBookDto.pagesCount;
      book.title = createBookDto.title;
      console.log(book);
      //save the book
      return await this.booksRepository.save(book);
    } catch (error) {
      return new HttpException(
        'oops something went wrong please retry in few seconds' +
          '\n' +
          error.message,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
