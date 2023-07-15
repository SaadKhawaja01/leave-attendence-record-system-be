import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IEmployeeCreate, IEmployeePatch } from './employee.dto';

export class EmployeeCreate implements IEmployeeCreate {
  @ApiProperty({ default: 'Saad@xyz.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'John Smith' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ default: 'junior developer' })
  @IsNotEmpty()
  designation: string;
  @ApiProperty({ default: '0300-12345678' })
  @IsNotEmpty()
  @IsEmail()
  contact: string;

  @ApiProperty({ default: 5 })
  @IsNotEmpty()
  @IsNumber()
  allowedEarnedLeaves: number;
  @ApiProperty({ default: 5 })
  @IsNotEmpty()
  @IsNumber()
  allowedCasualLeaves: number;
  @ApiProperty({ default: 5 })
  @IsNotEmpty()
  @IsNumber()
  allowedCompensatoryLeaves: number;

  @ApiProperty({ default: 50000 })
  @IsNotEmpty()
  @IsNumber()
  salary: number;
}
export class EmployeePatch implements IEmployeePatch {
  @ApiProperty({ default: 'John Smith' })
  @IsString()
  name: string;
  @ApiProperty({ default: 'password' })
  @IsString()
  password: string;
  @ApiProperty({ default: '0300-12345678' })
  @IsEmail()
  contact: string;
  @ApiProperty({ default: 'junior developer' })
  @IsNotEmpty()
  designation: string;
  @ApiProperty({ default: 5 })
  @IsNumber()
  allowedEarnedLeaves: number;
  @ApiProperty({ default: 5 })
  @IsNumber()
  allowedCasualLeaves: number;
  @ApiProperty({ default: 5 })
  @IsNumber()
  allowedCompensatoryLeaves: number;

  @ApiProperty({ default: 5000 })
  @IsNumber()
  salary: number;
}
