import { IsNotEmpty } from 'class-validator';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Column()
  userName: string;
  @IsNotEmpty()
  @Column()
  email: string;
  @IsNotEmpty()
  @Column()
  password: string;
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
