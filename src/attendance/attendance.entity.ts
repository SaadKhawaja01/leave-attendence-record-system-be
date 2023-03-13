import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  employeeId: string;
  @Column()
  attendanceDate: Date;

  @Column(
    // { type: 'time' }
    )
  loginTime: Date;
  @Column(
    // { type: 'time' }
    )
  logoutTime: Date;
  @Column()
  workingHours: string;
}
