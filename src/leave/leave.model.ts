
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ILeaveApplication } from './leave.dto';



export class LeaveApplication implements ILeaveApplication {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  leaveDates: [];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
