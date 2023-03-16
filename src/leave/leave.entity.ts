import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Leave extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  employeeId: string;

  @Column()
  applcationDate: Date;

  @Column()
  allowedLeaves: number;

  @Column()
  consumedLeaves: number;

  @Column()
  appliedLeaveDays: number;

  @Column()
  description: string;

  @Column()
  leaveDates: string;

  @Column({ default: 'Pending' })
  status: string;
}
