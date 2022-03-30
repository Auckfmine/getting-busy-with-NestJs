import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseModule } from 'src/database.module';
import { InvoiceProvider } from './invoice.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InvoiceController],
  providers: [...InvoiceProvider, InvoiceService],
})
export class InvoiceModule {}
