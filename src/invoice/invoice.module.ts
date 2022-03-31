import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from 'src/database.module';
import { InvoiceProvider } from './invoice.providers';
import { OrderProviders } from 'src/order/order.providers';
import { userProviders } from 'src/user/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [
    ...InvoiceProvider,
    ...OrderProviders,
    ...userProviders,
    InvoiceService,
  ],
})
export class InvoiceModule {}
