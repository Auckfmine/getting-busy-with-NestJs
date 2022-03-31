import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;
  @Column()
  quantity: number;

  @ManyToOne(() => Book, { eager: true })
  @JoinColumn()
  book: Book;
}
