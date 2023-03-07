import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IEmployeeCreate, IEmployeePatch } from './employee.dto';

export class EmployeeCreate implements IEmployeeCreate {
  @ApiProperty({ default: 'Usama' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 'Saad' })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ default: '0300-1234789' })
  @IsNotEmpty()
  @IsEmail()
  contact: string;
  @ApiProperty({ default: '89703343-3b10-4e51-9966-8d21c662f4a9' })
  @IsNotEmpty()
  @IsString()
  departmentId: string;
  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  salary: number;
}
export class EmployeePatch implements IEmployeePatch {
  @ApiProperty({ default: 'Usama' })
  @IsString()
  name: string;
  @ApiProperty({ default: 'Saad' })
  @IsString()
  password: string;
  @ApiProperty({ default: '0300-1234789' })
  @IsEmail()
  contact: string;
  @ApiProperty({ default: '89703343-3b10-4e51-9966-8d21c662f4a9' })
  @IsString()
  departmentId: string;
  @ApiProperty({ default: 0 })
  @IsNumber()
  salary: number;
}
