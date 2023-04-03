import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/core/guards/jwt.guard';
import { ILeaveApplicationResponse } from './leave.dto';
import { LeaveApplication } from './leave.model';
import { LeaveService } from './leave.service';

@ApiTags('Leave')
@ApiBearerAuth()
@UseGuards(JwtGuard)
//routes for leave
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('/application')
  async application(@Body() data: LeaveApplication, @Req() request) :Promise<ILeaveApplicationResponse>{
    return await this.leaveService.application(data, request.user);
  }

  @Get('/status')
  async leaveStatus(@Req() request) {
    return await this.leaveService.leaveStatus( request.user);
  }

  @Get('/applications')
  async leaveApplications(@Req() request) {
    return await this.leaveService.leaveApplications( request.user);
  }






}
