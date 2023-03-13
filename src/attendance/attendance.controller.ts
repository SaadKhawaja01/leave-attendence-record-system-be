import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Get, Query, Req } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  async loginTime(@Req() request) {
    return await this.attendanceService.loginTime(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/logouttime')
  async logoutTime(@Req() request) {
    return await this.attendanceService.logoutTime(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiQuery({
    name: 'fromDate',
    required: false,
    type: Date,
    description: '2023-03-11 00:00:01',
  })
  @ApiQuery({
    name: 'toDate',
    required: false,
    type: Date,
    description: '2023-03-11 23:59:59',
  })
  @Get()
  async attendance(
    @Req() request,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    return await this.attendanceService.attendance(
      request.user,
      fromDate,
      toDate,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiQuery({
    name: 'fromDate',
    required: false,
    type: Date,
    description: '2023-03-11 00:00:01',
  })
  @ApiQuery({
    name: 'toDate',
    required: false,
    type: Date,
    description: '2023-03-11 23:59:59',
  })
  @Get('/workinghours')
  async workingHours(
    @Req() request,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    return await this.attendanceService.workingHours(
      request.user,
      fromDate,
      toDate,
    );
  }
}
