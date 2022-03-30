/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Order } from './entities/order.entity';

export const OrderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
];
