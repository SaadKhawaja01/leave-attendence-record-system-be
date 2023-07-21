import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Patch, Query } from '@nestjs/common/decorators';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { adminSignIn, PatchApplication } from './admin.model';
import { AdminService } from './admin.service';
//this is admin controller
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

  @Get('leave-records')
  async leaveRecords() {
    return await this.adminService.leaveRecords();
  }

  @ApiQuery({
    name: 'employeeId',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: 'string',
  })
  @Get('leave-applications')
  async leaveApplications(
    @Query('employeeId') id: string,
    @Query('status') status: string,
  ) {
    return await this.adminService.leaveApplications(id, status);
  }

  @Patch('leave-applications')
  async patchApplication(@Body() data: PatchApplication) {
    return await this.adminService.patchApplication(data);
  }
}
