// import { Injectable } from '@nestjs/common';
// import { HttpStatus } from '@nestjs/common/enums';
// import { HttpException } from '@nestjs/common/exceptions';
// import { Employee } from 'src/employee/employee.entity';
// import { ILeaveApplication, ILeaveApplicationResponse } from './oldleave.dto';
// import { Leave } from './oldleave.entity';

// @Injectable()
// export class LeaveService {
//   async application(
//     data: ILeaveApplication,
//     user: Employee,
//   ): Promise<ILeaveApplicationResponse> {
//     const application = new Leave();
//     application.employeeId = user.id;
//     application.applcationDate = new Date();
//     application.allowedLeaves = user.yearlyLeaves;
//     application.consumedLeaves = user.consumedLeaves;
//     application.description = data.description;
//     application.leaveDates = data.leaveDates.toString();
//     application.status = 'Pending';
//     application.appliedLeaveDays = data.leaveDates.length;
//     await application.save();

//     let availableLeaves =
//       application.allowedLeaves - application.consumedLeaves;

//     return {
//       ...application,
//       availableLeaves,
//     };
//   }

//   async leaveStatus(user: Employee) {
//     const userData = await Employee.findOneBy({ id: user.id });
//     if (!userData) {
//       throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
//     }

//     return {
//       AllowedLeaves: userData.yearlyLeaves,
//       ConsumedLeaves: userData.consumedLeaves,
//     };
//   }

//   async leaveApplications(user: Employee) {
//     const applications = await Leave.findBy({ employeeId: user.id });

//     return applications;
//   }
// }
