import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnprocessableEntityException } from '@nestjs/common/exceptions';
import { Department } from 'src/department/department.entity';
import { IEmployeeResponse } from './employee.dto';
import { Employee } from './employee.entity';
import { EmployeeCreate, EmployeePatch } from './employee.model';

@Injectable()
export class EmployeeService {
  async findAll(): Promise<Employee[]> {
    return await Employee.find();
  }

  async findOne(id: string): Promise<Employee> {
    return await Employee.findOneBy({ id });
  }

  async create(data: EmployeeCreate): Promise<any> {

    //to make sure user cant send empty form
    if(!data.allowedCasualLeaves || !data.allowedCompensatoryLeaves ||!data.allowedEarnedLeaves || !data.contact || !data.designation || !data.email || !data.name || !data.password || !data.salary){
      throw new UnprocessableEntityException("you must have to fill the full form")
    }


    const found = await Employee.findOneBy({ email: data.email });
    if (found) {
      throw new HttpException(
        'employee already registerd with this email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const employee = new Employee();
    employee.name = data.name;
    employee.email = data.email;
    employee.designation = data.designation;
    employee.password = data.password;
    employee.contact = data.contact;
    employee.salary = data.salary;
    employee.allowedEarnedLeaves = data.allowedEarnedLeaves;
    employee.allowedCasualLeaves = data.allowedCasualLeaves;
    employee.allowedCompensatoryLeaves = data.allowedCompensatoryLeaves;
    await employee.save();
    return employee;
  }

  async update(id: string, data: EmployeePatch): Promise<Employee> {

    //to make sure user cant send empty form
    if(!data.allowedCasualLeaves || !data.allowedCompensatoryLeaves ||!data.allowedEarnedLeaves || !data.contact || !data.designation || !data.name || !data.password || !data.salary){
      throw new UnprocessableEntityException("you must have to fill the full form")
    }



    let employee = await this.findOne(id);
    employee.name = data.name;
    employee.designation = data.designation;
    employee.password = data.password;
    employee.contact = data.contact;
    employee.allowedEarnedLeaves = data.allowedEarnedLeaves;
    employee.allowedCasualLeaves = data.allowedCasualLeaves;
    employee.allowedCompensatoryLeaves = data.allowedCompensatoryLeaves;

    employee.salary = data.salary;

    await employee.save();
    return employee;
  }

  async delete(id: string): Promise<IEmployeeResponse> {
    const employee = await Employee.findOneBy({ id });
    await Employee.delete(id);
    return employee;
  }
}
