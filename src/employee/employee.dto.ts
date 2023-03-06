export interface IEmployeeCreate {
  name: string;
  password: string;
  contact: string;
  departmentId: string;
  salary: number;
}
export interface IEmployeePatch {
  name: string;
  password: string;
  contact: string;
  departmentId: string;
  salary: number;
}
export interface IEmployeeResponse {
  id: string;
  name: string;
  password: string;
  contact: string;
  departmentId: string;
  salary: number;
}

