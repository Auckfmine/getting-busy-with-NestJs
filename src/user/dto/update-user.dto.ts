import { PartialType } from '@nestjs/mapped-types';
import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  userName: string;
  @IsEmail()
  email: string;
  @IsByteLength(8, 100)
  password: string;
}
