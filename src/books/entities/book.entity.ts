import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  pagesCount: number;
  @Column()
  description: string;
  @Column({ default: false })
  availability: boolean;
  @Column()
  price: number;

  @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  author: User;
}
