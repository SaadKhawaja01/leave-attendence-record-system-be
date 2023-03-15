export interface ILeaveApplication {
  leaveDates: [];
  description: string;
}

export interface ILeaveApplicationResponse {
  id: string;
  employeeId: string;
  applcationDate: Date;
  allowedLeaves: number;
  consumedLeaves: number;
  availableLeaves: number;
  description: string;
  leaveDates: string;
  leaveDays: number;
  status: string;
}
// export interface IChangePassword {
//   password: string;
// }