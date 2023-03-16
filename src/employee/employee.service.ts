import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Department } from 'src/department/department.entity';
import { DataSource } from 'typeorm';
import { IEmployeeCreate, IEmployeeResponse } from './employee.dto';
import { Employee } from './employee.entity';
import { EmployeeCreate, EmployeePatch } from './employee.model';

@Injectable()
export class EmployeeService {
  async findAll(): Promise<Employee[]> {
    return Employee.find();
  }

  async findOne(id: string): Promise<Employee> {
    return Employee.findOneBy({ id });
  }

  async create(data: EmployeeCreate): Promise<any> {
    const found = await Employee.findOneBy({ contact: data.contact });
    if (found) {
      throw new HttpException(
        'employee already registerd with this number',
        HttpStatus.BAD_REQUEST,
      );
    }

    const dep = await Department.findOneBy({ id: data.departmentId });
    if (!dep) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    const employee = new Employee();
    employee.name = data.name;
    employee.password = data.password;
    employee.contact = data.contact;
    employee.departmentId = data.departmentId;
    employee.salary = data.salary;
    employee.yearlyLeaves = dep.allowedLeaves;
    await employee.save();
    return employee;
  }

  async update(id: string, employee: EmployeePatch): Promise<Employee> {
    let emp = await this.findOne(id);
    emp.name = employee.name;
    emp.password = employee.password;
    emp.contact = employee.contact;
    emp.departmentId = employee.departmentId;
    let dep = await Department.findOneBy({ id: employee.departmentId });
    emp.yearlyLeaves = dep.allowedLeaves;
    emp.salary = employee.salary;

    await emp.save();
    return emp;
  }

  async delete(id: string): Promise<IEmployeeResponse> {
    const employee = await Employee.findOneBy({ id });
    await Employee.delete(id);
    return employee;
  }
}
