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
  departmentId: string;

  @Column()
  yearlyLeaves: number;
  @Column()
  consumedLeaves: number;
}
