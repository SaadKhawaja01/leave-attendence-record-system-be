// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// import {
//   IDepartmentCreate,
//   IDepartmentPatch,
//   IDepartmentUpdate,
// } from './attendance.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IChangePassword, ISignIn } from './attendance.dto';

// export class DepartmentCreate implements IDepartmentCreate {
//   @ApiProperty({ default: 'IT-Department' })
//   @IsNotEmpty()
//   @IsString()
//   name: string;
//   @ApiProperty({ default: 0 })
//   @IsNotEmpty()
//   @IsNumber()
//   allowedLeaves: number;
// }
// export class DepartmentPatch implements IDepartmentPatch {
//   @ApiProperty({ default: 'IT-Department' })
//   @IsNotEmpty()
//   @IsString()
//   name: string;
//   @ApiProperty({ default: 0 })
//   @IsNotEmpty()
//   @IsNumber()
//   allowedLeaves: number;
// }
// export class DepartmentUpdate implements IDepartmentUpdate {
//   @ApiProperty({ default: 'IT-Department' })
//   @IsNotEmpty()
//   @IsString()
//   name: string;
//   @ApiProperty({ default: 0 })
//   @IsNotEmpty()
//   @IsNumber()
//   allowedLeaves: number;
// }
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
