import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  contact: string;

  @Column()
  salary: number;

  @Column()
  allowedEarnedLeaves: number;
  @Column({default: 0})
  consumedEarnedLeaves: number;

  @Column()
  allowedCasualLeaves: number;
  @Column({default: 0})
  consumedCasualLeaves: number;

  @Column()
  allowedCompensatoryLeaves: number;
  @Column({default: 0})
  consumedCompensatoryLeaves: number;
}
