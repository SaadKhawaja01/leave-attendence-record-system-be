import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/employee/employee.entity';
import { Between } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
 
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

  async attendance(request: Employee, fromDate: Date, toDate: Date) {
    const attendanceRecords = await Attendance.findBy({
      employeeId: request.id,
      attendanceDate: fromDate && toDate && Between(fromDate, toDate),
    });

    return attendanceRecords;
  }

  async workingHours(request: Employee, fromDate: Date, toDate: Date) {
    var workedHours = 0;
    const attendanceRecords = await Attendance.findBy({
      employeeId: request.id,
      attendanceDate: fromDate && toDate && Between(fromDate, toDate),
    });

    attendanceRecords.forEach((record) => {
      workedHours += parseFloat(parseFloat(record.workingHours).toFixed(1));
    });
    return { WokedHours: workedHours };
  }
}
