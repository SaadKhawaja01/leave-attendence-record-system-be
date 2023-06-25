

export interface IEmployeeCreate {
  name: string;
  password: string;
  contact: string;
  allowedEarnedLeaves: number;
  allowedCasualLeaves: number;
  allowedCompensatoryLeaves: number;
  salary: number;
}
export interface IEmployeePatch {
  name: string;
  password: string;
  contact: string;
  allowedEarnedLeaves: number;
  allowedCasualLeaves: number;
  allowedCompensatoryLeaves: number;
  salary: number;
}
export interface IEmployeeResponse {
  id: string;
  name: string;
  password: string;
  contact: string;
  allowedEarnedLeaves: number;
  consumedEarnedLeaves: number;
  allowedCasualLeaves: number;
  consumedCasualLeaves: number;
  allowedCompensatoryLeaves: number;
  consumedCompensatoryLeaves: number;
  salary: number;
}

