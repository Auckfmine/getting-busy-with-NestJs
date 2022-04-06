import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userRepository.findOne({ email: email });
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (user.email == email && passwordMatches) {
      const { password, books, invoices, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    console.log(payload);
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const exists: User = await this.userRepository.findOne({
        email: createUserDto.email,
      });

      if (exists) {
        return new HttpException(
          `user with email : ${exists.email} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      //hash the password and save it back to db
      const hashedPass = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPass;
      return this.userRepository.save(createUserDto);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
