import { Injectable } from '@nestjs/common';
import { IDepartmentResponse } from './Department.dto';
import { Department } from './department.entity';
import { DepartmentCreate, DepartmentPatch } from './department.model';

@Injectable()
export class DepartmentService {
  async findAll(): Promise<Department[]> {
    return Department.find();
  }

  async findOne(id: string): Promise<Department> {
    return Department.findOneBy({ id });
  }

  async create(data: DepartmentCreate) {
    const department = new Department();
    department.name = data.name;
    department.allowedLeaves = data.allowedLeaves;
    await department.save();
    return department;
  }

  async update(id: string, data: DepartmentPatch): Promise<Department> {
    await Department.update(id, data);
    return Department.findOneBy({ id });
  }

  async remove(id: string): Promise<IDepartmentResponse> {
    const department = await Department.findOneBy({ id });
    await Department.delete(id);
    return department;
  }
}
