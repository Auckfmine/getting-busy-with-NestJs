/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Invoice } from './entities/invoice.entity';

export const InvoiceProvider = [
  {
    provide: 'INVOICE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Invoice),
    inject: ['DATABASE_CONNECTION'],
  },
];
