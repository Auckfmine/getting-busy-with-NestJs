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
    @Inject('BOOKS_REPOSITORY')
    private readonly bookRepository: Repository<Book>,
  ) {}

  //create order method
  async create(createOrderDto: CreateOrderDto) {
    try {
      const book: Book = await this.bookRepository.findOne({
        id: createOrderDto.bookId,
      });
      console.log(book);

      if (!book) {
        return new HttpException('book not found', HttpStatus.NOT_FOUND);
      }

      const order: Order = new Order();
      order.book = book;
      order.quantity = createOrderDto.quantity;
      console.log(order);
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

  async findOne(id: number) {
    return await this.orderRepository.findOne({ orderId: id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.save(updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.delete({ orderId: id });
  }
}
