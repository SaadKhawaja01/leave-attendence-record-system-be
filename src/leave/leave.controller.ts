import { Body, Controller, Post,UseGuards} from '@nestjs/common';
import { Get, Req } from '@nestjs/common/decorators';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { LeaveApplication } from './leave.model';

import { LeaveService } from './leave.service';
import { JwtGuard } from 'src/core/guards/jwt.guard';

@ApiTags('Leave')
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  // @Post('/allowedLeaves')
  // async allowedLeaves(@Body() data: AllowedLeaves) {
  //   return await this.leaveService.allowedLeaves(data);
  // }

  // @Get()
  // async Leaves() {
  //   return await this.leaveService.Leaves();
  // }
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/application')
  async application(@Req() request,@Body() data: LeaveApplication) {
    return await this.leaveService.application(data,request.user);
  }
}
