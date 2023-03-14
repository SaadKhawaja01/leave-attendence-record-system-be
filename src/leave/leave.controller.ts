import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/core/guards/jwt.guard';
import { ILeaveApplication } from './leave.dto';
import { LeaveApplication } from './leave.model';
import { LeaveService } from './leave.service';

@ApiTags('Leave')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post('/application')
  async application(@Body() data: LeaveApplication, @Req() request) {
    return await this.leaveService.application(data, request.user);
  }
}
