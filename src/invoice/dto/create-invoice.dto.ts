import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateInvoiceDto {
  discount: string;
  @IsNotEmpty()
  clientId: number;
  @IsNotEmpty()
  @IsArray()
  orderIds: number[];
}
