// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import { IChangePassword, ISignIn } from './leave.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ILeaveApplication } from './leave.dto';

// export class SignIn implements ISignIn {
//   @ApiProperty({ default: 'Usama' })
//   @IsNotEmpty()
//   @IsString()
//   name: string;
//   @ApiProperty({ default: '0300-1234567' })
//   @IsNotEmpty()
//   @IsString()
//   contact: string;
//   @ApiProperty({ default: 'password' })
//   @IsNotEmpty()
//   @IsString()
//   password: string;
// }

export class LeaveApplication implements ILeaveApplication {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  leaveDates: Date[];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
