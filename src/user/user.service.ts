import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, JwtSecret } from 'src/core/guards/jwt.guard';
import { Employee } from 'src/employee/employee.entity';
import { changePassword, SignIn, userPatch } from './user.model';
import { Leave } from 'src/leave/leave.entity';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(data: SignIn) {
    const employee = await Employee.findOneBy({ email: data.email });
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
      salary: employee.salary,
    };
    const jwttoken = await this.jwtService.sign(payload, { secret: JwtSecret });

    return { ...employee, jwt: jwttoken };
  }

  async changePassword(data: changePassword, request: Employee) {
    //finding employee
    const employee = await Employee.findOneBy({ id: request.id });
    employee.password = data.password;
    await employee.save();
    return { ...employee };
  }

  async update(user: Employee, data: userPatch): Promise<Employee> {
    //to make sure user cant send empty form
    if(!data.name || !data.password ||!data.contact || !data.contact ){
      throw new UnprocessableEntityException("you must have to fill the full form")
    }




    //finding employee
    let emp = await Employee.findOneBy({ id: user.id });
    emp.name = data.name;
    emp.password = data.password;
    emp.contact = data.contact;

    await emp.save();
    return emp;
  }

  async leaveRecords(user: Employee) {
    const employe = await Employee.findOneBy({ id: user.id });

    return {
      allowedEarnedLeaves: employe.allowedEarnedLeaves,
      consumedEarnedLeaves: employe.consumedEarnedLeaves,
      allowedCasualLeaves: employe.allowedCasualLeaves,
      consumedCasualLeaves: employe.consumedCasualLeaves,
      allowedCompensatoryLeaves: employe.allowedCompensatoryLeaves,
      consumedCompensatoryLeaves: employe.consumedCompensatoryLeaves,
    };
  }

  async leaveApplications(user: Employee) {
    return await Leave.findBy({ employeeId: user.id });
  }
}
