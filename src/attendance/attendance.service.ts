import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IsDate } from 'class-validator';
import { IJwtPayload, JwtSecret } from 'src/core/guards/jwt.guard';
import { Employee } from 'src/employee/employee.entity';
import { Attendance } from './attendance.entity';
import { changePassword, SignIn } from './attendance.model';

@Injectable()
export class AttendanceService {
  //for jwt step 1
  constructor(private readonly jwtService: JwtService) {}

  async signIn(data: SignIn) {
    const employee = await Employee.findOneBy({ contact: data.contact });
    if (!employee) {
      throw new HttpException('employee not found', HttpStatus.NOT_FOUND);
    }

    if (employee.password !== data.password) {
      throw new HttpException('password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    //jwt 2
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

  async loginTime(request: Employee) {
    const employee = await Employee.findOneBy({ id: request.id });
    if (!employee) {
      throw new HttpException('Wrong Employee Id', HttpStatus.NOT_FOUND);
    }

    //also check for already attendance

    const attendance = new Attendance();
    attendance.employeeId = request.id;
    attendance.attendanceDate = new Date();
    attendance.loginTime = new Date();
    await attendance.save();
    return attendance;
  }

  async logoutTime(request: Employee) {
    const attendanceRec = await Attendance.findBy({
      employeeId: request.id,
    });
    if (!attendanceRec) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }

    const filterdRec = attendanceRec.filter((rec) => {
      const parts = rec.attendanceDate.toDateString().split(' ');
      const today = new Date().toDateString().split(' ');
      if (parts[2] == today[2] && parts[3] == today[3]) {
        return rec;
      }
    });

    const record = await Attendance.findOneBy({ id: filterdRec[0].id });
    record.logoutTime = new Date();
    await record.save();

    //also save total worked hours

    // const attendance = new Attendance();
    // attendance.employeeId = request.id;
    // attendance.attendanceDate = new Date();
    // attendance.loginTime = new Date();
    // await attendance.save();
    return record;
  }
}
