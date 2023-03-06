import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  IDepartmentCreate,
  IDepartmentPatch,
  IDepartmentUpdate,
} from './Department.dto';

export class DepartmentCreate implements IDepartmentCreate {
  @ApiProperty({ default: 'IT-Department' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  allowedLeaves: number;
}
export class DepartmentPatch implements IDepartmentPatch {
  @ApiProperty({ default: 'IT-Department' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  allowedLeaves: number;
}
export class DepartmentUpdate implements IDepartmentUpdate {
  @ApiProperty({ default: 'IT-Department' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  allowedLeaves: number;
}
