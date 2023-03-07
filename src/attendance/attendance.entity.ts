import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  employeeId: string;
  @Column()
  attendanceDate: Date;

  @Column()
  loginTime: Date;
  @Column()
  logoutTime: Date;
  @Column()
  workingHours: number;
}
