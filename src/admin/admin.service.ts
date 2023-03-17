import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Attendance } from 'src/attendance/attendance.entity';
import { Employee } from 'src/employee/employee.entity';
import { Leave } from 'src/leave/leave.entity';
import { Between } from 'typeorm';
import { IAdminSignIn, IPatchApplication } from './admin.dto';

@Injectable()
export class AdminService {
  adminSignIn(data: IAdminSignIn) {
    //admin credentials check
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

    // find attendance records
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
      //to get values like 5.5 (to skip other points values)
      workedHours += parseFloat(parseFloat(record.workingHours).toFixed(1));
    });
    return { WokedHours: workedHours };
  }

  async leaveRecords() {
    const userData = await Employee.find();
    let data = userData.map((employee) => {
      return {
        EmployeeName:employee.name,
        EmployeeDepartment:employee.departmentId,
        AllowedLeaves: employee.yearlyLeaves,
        ConsumedLeaves: employee.consumedLeaves,
      };
    });

    return data;
  }

  async leaveApplications(id: string) {
    const applications = await Leave.findBy({
      status: 'Pending',
      employeeId: id,
    });

    return applications;
  }

  async patchApplication(data: IPatchApplication) {
    //to check for valid status
    if (data.status !== 'Accepted' && data.status !== 'Rejected') {
      throw new HttpException(
        'you must select status between Accepted & Rejected',
        HttpStatus.BAD_REQUEST,
      );
    }

    // to check for valid leaved application id
    let leaveApplication = await Leave.findOneBy({ id: data.id });
    if (!leaveApplication)
      throw new HttpException(
        'leave application not found',
        HttpStatus.NOT_FOUND,
      );

    // update status
    if (data.status === 'Accepted') {
      let user = await Employee.findOneBy({ id: leaveApplication.employeeId });
      user.consumedLeaves += leaveApplication.appliedLeaveDays;
      leaveApplication.status = 'Accepted';
      leaveApplication.consumedLeaves = leaveApplication.appliedLeaveDays;
      await user.save();
      await leaveApplication.save();
      return leaveApplication;
    }

 
    let user = await Employee.findOneBy({ id: leaveApplication.employeeId });
    leaveApplication.status = 'Rejected';
    await leaveApplication.save();
    return leaveApplication;
  }
}
