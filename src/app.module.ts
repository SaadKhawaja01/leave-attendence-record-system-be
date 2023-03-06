import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/department.entity';

const DB = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'leaveattendance',
  entities: [Employee, Department],
  synchronize: true,
});

@Module({
  imports: [DB, AdminModule, DepartmentModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
