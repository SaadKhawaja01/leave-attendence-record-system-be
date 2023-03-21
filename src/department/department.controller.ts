import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IDepartmentResponse } from './Department.dto';
import { Department } from './department.entity';
import { DepartmentCreate, DepartmentUpdate } from './department.model';
import { DepartmentService } from './department.service';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() department: DepartmentCreate){
    return this.departmentService.create(department);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() department: DepartmentUpdate,
  ): Promise<Department> {
    return this.departmentService.update(id, department);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IDepartmentResponse> {
    return this.departmentService.remove(id);
  }
}
