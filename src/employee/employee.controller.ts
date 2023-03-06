import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IEmployeeResponse } from './employee.dto';
import { Employee } from './employee.entity';
import { EmployeeCreate, EmployeePatch } from './employee.model';
import { EmployeeService } from './employee.service';


@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService:EmployeeService){}


    @Get()
    async findAll(): Promise<Employee[]> {
      return this.employeeService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Employee> {
      return this.employeeService.findOne(id);
    }
  
    @Post()
    async create(@Body() data: EmployeeCreate): Promise<IEmployeeResponse> {
      return this.employeeService.create(data);
    
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() employee: EmployeePatch): Promise<IEmployeeResponse> {
      return this.employeeService.update(id, employee);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<IEmployeeResponse> {
      return this.employeeService.delete(id);
    }




}
