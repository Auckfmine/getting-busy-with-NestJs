import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userRepository.findOne({ email: email });
    console.log(user);
    if (user.email == email && user.password === password) {
      const { password, books, invoices, ...result } = user;
      return result;
    }

    return null;
  }
}
