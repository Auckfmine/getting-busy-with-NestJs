import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';
import { randomUUID } from 'crypto';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
    @Inject('INVOICE_REPOSITORY')
    private readonly invoiceRepository: Repository<Invoice>,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const orders: Order[] = await this.orderRepository.findByIds(
        createInvoiceDto.orderIds,
      );
      const client: User = await this.userRepository.findOne({
        id: createInvoiceDto.clientId,
      });
      if (!orders || !client) {
        return new HttpException('prob', HttpStatus.NOT_FOUND);
      }
      // savingthe invoice here
      let totalPrice = 0;
      const invoice: Invoice = new Invoice();
      invoice.client = client;
      console.log(orders);
      for (const order of orders) {
        console.log(totalPrice);
        console.log(order.book.price);
        totalPrice += order.quantity * order.book.price;
      }

      invoice.reference = randomUUID();
      invoice.dueDate = new Date();
      invoice.orders = orders;
      invoice.totalPrice = totalPrice;
      console.log(invoice);
      return await this.invoiceRepository.save(invoice);
    } catch (error) {
      return new HttpException(
        'error : \n' + error.message,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  findAll() {
    return `This action returns all invoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoice`;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
