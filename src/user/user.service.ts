import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  logger: Logger = new Logger();
  //create user
  async create(createUserDto: CreateUserDto) {
    try {
      const exists: User = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      this.logger.log(exists);
      if (exists) {
        return new HttpException(
          `user with email : ${exists.email} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.userRepository.save(createUserDto);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //getAll users
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    try {
      const user: User = await this.userRepository.findOne({
        email: email,
      });
      console.log(user);

      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }
  //findUserById
  async findOne(id: number) {
    try {
      const user: User = await this.userRepository.findOne(id);
      if (!user) {
        return new HttpException(
          `user with id : ${id} not found in our db`,
          HttpStatus.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      return new HttpException(
        'something went wrong please retry in few seconds',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  //update user PS:NOT IMPLEMENTED YET
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  //delete user
  async remove(id: number) {
    try {
      const user: User = await this.userRepository.findOne({ id });
      if (!user) {
        return new HttpException(
          `user with id : ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.userRepository.remove(user);
    } catch (error) {
      return new HttpException(
        'something went wrong please retry in few seconds' +
          '\n' +
          error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
