import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/core/guards/jwt.guard';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module({

  controllers: [AttendanceController],
  //jwt 3
  providers: [AttendanceService, JwtService, JwtStrategy],
})
export class AttendanceModule {}
