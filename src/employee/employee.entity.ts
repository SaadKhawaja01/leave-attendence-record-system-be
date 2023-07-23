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

  @Column()
  allowedEarnedLeaves: number;
  @Column({ default: 0 })
  consumedEarnedLeaves: number;

  @Column()
  allowedCasualLeaves: number;
  @Column({ default: 0 })
  consumedCasualLeaves: number;

  @Column()
  allowedCompensatoryLeaves: number;
  @Column({ default: 0 })
  consumedCompensatoryLeaves: number;
}
