import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column()
  contact: string;

  @Column()
  designation: string;
  @Column()
  salary: number;

  @Column()
  halfLeaveMinutes: number;

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
}
