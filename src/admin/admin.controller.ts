import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { IAdminSignIn } from './admin.dto';
import { adminSignIn } from './admin.model';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  adminSignIn(@Body() data: adminSignIn) {
    return this.adminService.adminSignIn(data);
  }

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
  @Get(':id/attendance')
  async attendance(
    @Param('id') id: string,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    return await this.adminService.attendance(id, fromDate, toDate);
  }

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
  @Get(':id/workinghours')
  async workinghours(
    @Param('id') id: string,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    return await this.adminService.workingHours(id, fromDate, toDate);
  }


  @ApiQuery({
    name: 'employeeId',
    required: false,
    type: 'string',
    // description: '2023-03-11 00:00:01',
  })
  // @ApiQuery({
  //   name: 'toDate',
  //   required: false,
  //   type: Date,
  //   description: '2023-03-11 23:59:59',
  // })
  @Get('leave-applications')
  async leaveApplications(
    @Query('employeeId') id: string,
    // @Query('toDate') toDate: Date,
  ) {
    return await this.adminService.leaveApplications(id);
  }






}
