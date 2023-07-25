import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Leave extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  employeeName: string;

  @Column()
  leaveType: string;

  @Column({ type: 'double', precision: 10, scale: 2 })
  allowedEarnedLeaves: number;
  @Column({ type: 'double', precision: 10, scale: 2 })
  consumedEarnedLeaves: number;

  @Column({ type: 'double', precision: 10, scale: 2 })
  allowedCasualLeaves: number;
  @Column({ type: 'double', precision: 10, scale: 2 })
  consumedCasualLeaves: number;

  @Column({ type: 'double', precision: 10, scale: 2 })
  allowedCompensatoryLeaves: number;
  @Column({ type: 'double', precision: 10, scale: 2 })
  consumedCompensatoryLeaves: number;

  @Column()
  toDate: Date;

  @Column()
  fromDate: Date;

  @Column()
  appliedLeaveDays: number;

  @Column()
  descriptionLeave: string;

  @Column()
  reason: string;

  @Column({ default: 'Pending' })
  status: string;
}
