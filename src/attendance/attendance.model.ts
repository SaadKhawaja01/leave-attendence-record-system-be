

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IChangePassword, ISignIn } from './attendance.dto';

export class SignIn implements ISignIn {
  @ApiProperty({ default: 'Usama' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: '0300-1234567' })
  @IsNotEmpty()
  @IsString()
  contact: string;
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
