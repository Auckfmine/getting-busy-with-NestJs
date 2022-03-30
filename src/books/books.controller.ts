import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('add-book')
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('all-books')
  findAll() {
    return this.booksService.findAll();
  }

  @Get('find-book/:id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Patch('update-book/:id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete('delete-book/:id')
  remove(@Param('id') id: number) {
    return this.booksService.remove(id);
  }
  @Get('asignOwnerToBook/:bookID/:authorID')
  assignOwnerToBook(
    @Param('bookID') bookID: number,
    @Param('authorID') authorID: number,
  ) {
    return this.booksService.assignOwnerToBook(bookID, authorID);
  }

  //addBookAndAssignBookToAuthor
  @Post('/addBookAndAssignBookToAuthor/:authorID')
  addBookAndAssignBookToAuthor(
    @Body() createBookDto: CreateBookDto,
    @Param('authorID') authorID: number,
  ) {
    return this.booksService.addBookAndAssignBookToAuthor(
      createBookDto,
      authorID,
    );
  }
}
