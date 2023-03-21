import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, JwtSecret } from 'src/core/guards/jwt.guard';
import { Department } from 'src/department/department.entity';
import { Employee } from 'src/employee/employee.entity';
import { changePassword, SignIn, userPatch } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(data: SignIn) {
    const employee = await Employee.findOneBy({ contact: data.contact });
    if (!employee) {
      throw new HttpException('employee not found', HttpStatus.NOT_FOUND);
    }

    if (employee.password !== data.password) {
      throw new HttpException('password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    // //jwt 2
    const payload: IJwtPayload = {
      id: employee.id,
      name: employee.name,
      password: employee.password,
      contact: employee.contact,
      departmentId: employee.departmentId,
      salary: employee.salary,
    };
    const jwttoken = await this.jwtService.sign(payload, { secret: JwtSecret });

    return { ...employee, jwt: jwttoken };
  }

  async changePassword(data: changePassword, request: Employee) {
    console.log(request);
    const employee = await Employee.findOneBy({ id: request.id });
    employee.password = data.password;
    await employee.save();
    return { ...employee };
  }

  async update(user: Employee, employee: userPatch): Promise<Employee> {
    let emp = await Employee.findOneBy({ id: user.id });
    emp.name = employee.name;
    emp.password = employee.password;
    emp.contact = employee.contact;
   
    await emp.save();
    return emp;
  }
}
