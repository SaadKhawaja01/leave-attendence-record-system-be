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

    //to prevent dublication
    const attendanceRecords = await Attendance.findBy({
      employeeId: employee.id,
    });
    const todayRecord = attendanceRecords.map((record) => {
      let recDate = record.attendanceDate.toISOString().split('T')[0];
      const newDate = new Date().toISOString().split('T')[0];
      return recDate === newDate;
    });

    if (todayRecord[0] == true) {
      throw new HttpException(
        'already punched',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    //to save on db
    const attendance = new Attendance();
    attendance.employeeId = request.id;
    attendance.attendanceDate = new Date();
    attendance.loginTime = new Date();
    await attendance.save();

    //response preparation
    const toResponse = {
      employeeID: attendance.employeeId,
      attendanceDate: attendance.attendanceDate,
      loginTime: attendance.loginTime.toTimeString(),
    };
    return toResponse;
  }

  async logoutTime(request: Employee) {
    //to find records
    const attendanceRecords = await Attendance.findBy({
      employeeId: request.id,
    });
    const todayRecord = attendanceRecords.filter((record) => {
      let recDate = record.attendanceDate.toISOString().split('T')[0];
      const newDate = new Date().toISOString().split('T')[0];
      return recDate === newDate;
    });

    if (todayRecord.length == 0) {
      throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
    }

    //to save
    const record = await Attendance.findOneBy({ id: todayRecord[0].id });
    record.logoutTime = new Date();
    const timeDiff = Math.abs(
      record.logoutTime.getTime() - record.loginTime.getTime(),
    );
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    record.workingHours = hoursDiff.toString();

    await record.save();
    return record;
  }
}
