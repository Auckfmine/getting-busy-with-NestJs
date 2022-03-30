import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: Repository<Book>,
  ) {}

  //create order method
  async create(createOrderDto: CreateOrderDto) {
    try {
      const book: Book = await this.bookRepository.findOne({
        id: createOrderDto.bookId,
      });

      if (!book) {
        return new HttpException('book not found', HttpStatus.NOT_FOUND);
      }

      const order: Order = new Order();
      order.book = book;
      order.quantity = createOrderDto.quantity;
      return this.orderRepository.save(order);
    } catch (error) {
      return new HttpException(
        'oops exception occured \n' + error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  // find all orders
  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
