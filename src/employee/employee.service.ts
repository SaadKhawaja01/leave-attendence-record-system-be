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

 
    const dep =await Department.findOneBy({id:data.departmentId});
    if(!dep){
      throw new HttpException('Department not found',HttpStatus.NOT_FOUND);
    }

    const employee = new Employee();
    employee.name = data.name;
    employee.password = data.password;
    employee.contact = data.contact;
    employee.departmentId = data.departmentId;
    employee.salary = data.salary;
    await employee.save();
    return employee;
  }

  async update(id: string, employee: EmployeePatch): Promise<Employee> {
    await Employee.update(id, employee);
    return Employee.findOneBy({ id });
  }

  async delete(id: string): Promise<IEmployeeResponse> {
    const employee = await Employee.findOneBy({ id });
    await Employee.delete(id);
    return employee;
  }
}
