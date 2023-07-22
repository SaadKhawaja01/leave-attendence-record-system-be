import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IEmployeeCreate, IEmployeePatch } from './employee.dto';

export class EmployeeCreate implements IEmployeeCreate {
  @ApiProperty({ default: 'Saad@xyz.com',required: true }) 
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'John Smith',required: true  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 'password',required: true  })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({ default: 'junior developer',required: true })
  @IsNotEmpty()
  designation: string;
  @ApiProperty({ default: '0300-12345678',required: true })
  @IsNotEmpty()
  @IsEmail()
  contact: string;

  @ApiProperty({ default: 5,required: true })
  @IsNotEmpty()
  @IsNumber()
  allowedEarnedLeaves: number;
  @ApiProperty({ default: 5,required: true })
  @IsNotEmpty()
  @IsNumber()
  allowedCasualLeaves: number;
  @ApiProperty({ default: 5 ,required: true})
  @IsNotEmpty()
  @IsNumber()
  allowedCompensatoryLeaves: number;

  @ApiProperty({ default: 50000,required: true })
  @IsNotEmpty()
  @IsNumber()
  salary: number;
}
export class EmployeePatch implements IEmployeePatch {
  @ApiProperty({ default: 'John Smith',required: true })
  @IsString()
  name: string;
  @ApiProperty({ default: 'password' ,required: true})
  @IsString()
  password: string;
  @ApiProperty({ default: '0300-12345678',required: true })
  @IsEmail()
  contact: string;
  @ApiProperty({ default: 'junior developer',required: true })
  @IsNotEmpty()
  designation: string;
  @ApiProperty({ default: 5 ,required: true})
  @IsNumber()
  allowedEarnedLeaves: number;
  @ApiProperty({ default: 5,required: true })
  @IsNumber()
  allowedCasualLeaves: number;
  @ApiProperty({ default: 5 ,required: true})
  @IsNumber()
  allowedCompensatoryLeaves: number;

  @ApiProperty({ default: 5000 ,required: true})
  @IsNumber()
  salary: number;
}
