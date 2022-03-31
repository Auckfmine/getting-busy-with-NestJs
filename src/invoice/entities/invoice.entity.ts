import { IsUUID, UUIDVersion } from 'class-validator';
import { RandomUUIDOptions } from 'crypto';
import { type } from 'os';
import { Book } from 'src/books/entities/book.entity';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  invoiceId: number;
  @Column()
  @IsUUID()
  reference: string;
  @Column()
  dueDate: Date;
  @Column()
  totalPrice: number;
  @Column()
  discount: number;
  @ManyToOne(() => User)
  client: User;
  @ManyToMany(() => Order)
  @JoinTable()
  orders: Order[];
}
