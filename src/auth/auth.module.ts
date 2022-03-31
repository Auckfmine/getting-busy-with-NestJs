import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './auth.local-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from 'src/user/user.providers';

@Module({
  imports: [UserModule, PassportModule, DatabaseModule],
  providers: [AuthService, ...userProviders, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
