import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/department.entity';
import { AttendanceModule } from './attendance/attendance.module';

import { JwtSecret, JwtStrategy } from './core/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { Attendance } from './attendance/attendance.entity';
import { LeaveModule } from './leave/leave.module';
import { Leave } from './leave/leave.entity';
import { UserModule } from './user/user.module';

//for Sql Db 
const DB = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'leaveattendance',
  entities: [Employee, Department, Attendance,Leave],
  synchronize: true,
});

// all modules imports here 
@Module({
  imports: [
    DB,
    AdminModule,
    DepartmentModule,
    EmployeeModule,
    UserModule,
    AttendanceModule,
    LeaveModule,
    //jwt step 3
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: JwtSecret,
        };
      },
      inject: [ConfigService],
    }),
   
  
  ],
  controllers: [AppController],

  providers: [AppService, JwtStrategy],
})
export class AppModule {}
