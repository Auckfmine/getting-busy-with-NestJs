import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;
  @Column()
  quantity: number;

  @OneToOne(() => Book)
  book: Book;
}
