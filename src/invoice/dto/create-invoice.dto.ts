import { IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  discount: string;
  @IsNotEmpty()
  clientId: number;
  @IsNotEmpty()
  orderIds: number[];
}
