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

  @Column()
  allowedEarnedLeaves: number;
  @Column()
  consumedEarnedLeaves: number;

  @Column()
  allowedCasualLeaves: number;
  @Column()
  consumedCasualLeaves: number;

  @Column()
  allowedCompensatoryLeaves: number;
  @Column()
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
