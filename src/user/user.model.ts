import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IChangePassword, ISignIn, IUserPatch } from './user.dto';

export class SignIn implements ISignIn {
  @ApiProperty({ default: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: '0300-12345678' })
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
  @ApiProperty({ default: '89703343-3b10-4e51-9966-8d21c662f4a9' })
  @IsString()
  departmentId: string;
}
