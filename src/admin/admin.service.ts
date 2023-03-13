import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Attendance } from 'src/attendance/attendance.entity';
import { Employee } from 'src/employee/employee.entity';
import { Between } from 'typeorm';
import { IAdminSignIn } from './admin.dto';

@Injectable()
export class AdminService {
  adminSignIn(data: IAdminSignIn) {
    if (data.username !== 'admin' || data.password !== 'password') {
      throw new HttpException('wrong credentials', HttpStatus.BAD_REQUEST);
    }
    return 'LoggedIn successfully';
  }

  async attendance(id: string, fromDate: Date, toDate: Date) {
    //check for valid employee id
    const employee = await Employee.findOneBy({ id });
    if (!employee) {
      throw new HttpException('employee not found', HttpStatus.NOT_FOUND);
    }

    const attendanceRecords = await Attendance.findBy({
      employeeId: id,
      attendanceDate: fromDate && toDate && Between(fromDate, toDate),
    });

    return attendanceRecords;
  }

  async workingHours(id: string, fromDate: Date, toDate: Date) {

   //check for valid employee id
   const employee = await Employee.findOneBy({ id });
   if (!employee) {
     throw new HttpException('employee not found', HttpStatus.NOT_FOUND);
   }


    var workedHours = 0;
    const attendanceRecords = await Attendance.findBy({
      employeeId: id,
      attendanceDate: fromDate && toDate && Between(fromDate, toDate),
    });

    attendanceRecords.forEach((record) => {
      workedHours += parseFloat(parseFloat(record.workingHours).toFixed(1));
    });
    return { WokedHours: workedHours };
  }







}
