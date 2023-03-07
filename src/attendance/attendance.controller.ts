import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/core/guards/jwt.guard';
import { changePassword, SignIn } from './attendance.model';
import { AttendanceService } from './attendance.service';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  //jwt will be added on this route
  @Post('/signin')
  async Signin(@Body() data: SignIn) {
    return await this.attendanceService.signIn(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/changepassword')
  async changePassword(@Body() data: changePassword, @Req() request) {
    return await this.attendanceService.changePassword(data, request.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/logintime')
  async loginTime(@Req() request){
      return await this.attendanceService.loginTime(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/logouttime')
  async logoutTime(@Req() request){
      return await this.attendanceService.logoutTime(request.user);
  }





}
