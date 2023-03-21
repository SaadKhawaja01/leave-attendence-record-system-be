import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService,JwtService]
})
export class UserModule {}
