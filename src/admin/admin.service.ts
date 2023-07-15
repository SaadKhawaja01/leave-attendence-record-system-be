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
    if (data.email !== 'admin@xyz.com' || data.password !== 'password') {
      throw new HttpException('wrong credentials', HttpStatus.BAD_REQUEST);
    }
    return data;
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
        EmployeeId: employee.id,
        EmployeeName: employee.name,
        EmployeeContact: employee.contact,
        allowedEarnedLeaves: employee.allowedEarnedLeaves,
        consumedEarnedLeaves: employee.consumedEarnedLeaves,
        allowedCasualLeaves: employee.allowedCasualLeaves,
        consumedCasualLeaves: employee.consumedCasualLeaves,
        allowedCompensatoryLeaves: employee.allowedCompensatoryLeaves,
        consumedCompensatoryLeaves: employee.consumedCompensatoryLeaves,
      };
    });

    return data;
  }

  async leaveApplications(id: string, status: string) {
    const applications = await Leave.findBy({
      status: status,
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
    let application = await Leave.findOneBy({
      id: data.applicationId,
      status: 'Pending',
    });
    if (!application)
      throw new HttpException(
        'leave application not found',
        HttpStatus.NOT_FOUND,
      );

    // updating employee entity
    if (data.status === 'Accepted') {
      let employee = await Employee.findOneBy({ id: application.employeeId });
      if (application.leaveType == 'earnedLeaves') {
        employee.consumedEarnedLeaves += application.appliedLeaveDays;
      } else if (application.leaveType == 'casualLeaves') {
        employee.consumedCasualLeaves += application.appliedLeaveDays;
      } else if (application.leaveType == 'compensatoryLeaves') {
        employee.consumedCompensatoryLeaves += application.appliedLeaveDays;
      }

      await employee.save();
    }

    application.status = data.status;
    await application.save();
    return application;
  }
}
