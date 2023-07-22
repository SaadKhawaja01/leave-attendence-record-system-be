import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';
import {  ILeaveApplication } from './leave.dto';

export class LeaveApplication implements ILeaveApplication {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  toDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  fromDate: Date;

  @ApiProperty({default:'full'})
  @IsNotEmpty()
  @IsString()
  leaveType: string;

  @IsString()
  @ApiProperty({ default: 'Casual' })
  @IsNotEmpty()
  descriptionLeave: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  reason: string;
}

// export class AllowedLeaves implements IAllowedLeaves {
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsString()
//   leaveType: string;
  
//   @ApiProperty()
//   @IsNotEmpty()
//   @IsNumber()
//   allowedLeaves: number;

// }
