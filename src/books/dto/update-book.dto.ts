import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  title: string;

  pagesCount: number;

  description: string;

  availability: boolean;
}
