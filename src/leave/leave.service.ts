import { Injectable } from '@nestjs/common';
import { Employee } from 'src/employee/employee.entity';
import { ILeaveApplication } from './leave.dto';

@Injectable()
export class LeaveService {
  application(data: ILeaveApplication, user: Employee) {
    return 'test';
  }
}
