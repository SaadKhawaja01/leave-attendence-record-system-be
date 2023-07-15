import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IChangePassword, ISignIn, IUserPatch } from './user.dto';

export class SignIn implements ISignIn {
  @ApiProperty({ default: 'Saad@xyz.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class changePassword implements IChangePassword {
  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class userPatch implements IUserPatch {
  @ApiProperty({ default: 'John Smith' })
  @IsString()
  name: string;
  @ApiProperty({ default: 'password' })
  @IsString()
  password: string;
  @ApiProperty({ default: '0300-12345678' })
  @IsEmail()
  contact: string;
}
